const express = require('express')
const fs = require('fs')

class App {
    constructor() {
        this.app = null
        this.port = 8081
        this.contentPath = '/api/v2'
        this.routeModules = []
        this.middlewares = [
            
        ]
    }

    scanModules(moduleName) {
        moduleName = './' + moduleName
        var readDir = fs.readdirSync(moduleName)
        readDir = readDir.map(str => {
            str = str.split('.')[0]
            let path = moduleName + '/' + str
            return require(path)
        })
        return readDir
    }

    registerRoutes(routeList) {
        for (let j = 0; j < routeList.length; j++) {
            const routes = routeList[j]['routes']

            for (var i = 0; i < routes.length; i++) {
                var route = routes[i]
                this.app[route.method](this.contentPath + route.path, route.func)
            }
        }
    }

    registerMiddlewares(middlewareList) {
        console.log("middlewareList: ", middlewareList);
        for (let j = 0; j < middlewareList.length; j++) {
            const components = middlewareList[j]['components']

            for (var i = 0; i < components.length; i++) {
                var com = components[i]
                console.log("com: ", com);
                console.log("com: ", typeof com);
                // this.app['use'](com)
                this.app.use(com)
            }
        }
    }

    connectDatabase() {}

    async run() {
        this.app = express();
        
        this.middlewares = this.scanModules("middlewares")
        this.registerMiddlewares(this.middlewares)
        this.app.use(express.json())

        this.routeModules = this.scanModules("route")
        this.registerRoutes(this.routeModules)

        var server = this.app.listen(this.port, 'localhost', function () {
            var host = server.address().address
            var port = server.address().port

            console.log("app run on: http://%s:%s", host, port)
        })
    }
}

async function _main() {
    let app = new App()

    app.connectDatabase = require('./db/mongoose')['connectDatabase']
    app.connectDatabase()

    await app.run()
}

_main()