
"use strict";

const _ = require("lodash");
const onErrorMiddleware = require("../middlewares/apiErrorMiddleware");

const swaggerInitializer = require("../swagger/swaggerInitializer");

module.exports.init = function({
    app,
    specFile = "employees-api.yml",
    pathFilterFunc,
    handlers,
    beforeSwaggerMiddlewares = [],
    afterSwaggerMiddlewares = []
}) {
    if (_.isEmpty(afterSwaggerMiddlewares)) {
        afterSwaggerMiddlewares.push(onErrorMiddleware);
    }

    // We'll extract the basePath from the swagger file and give it to swaggerInitializer.initFromHandlers,
    // instead of relying on swagger router; otherwise, the swagger monitoring middleware will be applied
    // for every route of the application!
    const swaggerSpecsPath = __dirname + `/api/${specFile}`;
    const swaggerSpecs = swaggerInitializer.loadSwaggerSpecs(swaggerSpecsPath);

    swaggerInitializer.initFromHandlers({
        app,
        basePath: swaggerSpecs.basePath,
        swaggerSpecsPath,
        pathFilterFunc,
        specCustomizer,
        handlers,
        beforeSwaggerMiddlewares,
        afterSwaggerMiddlewares
    });

    function specCustomizer(swaggerSpecs) {
        // Remove base path from swagger spec (it is already passed to swagger initializer)
        swaggerSpecs.basePath = "/";

        // Remove controllers if present (we'll instead rely on the handlers defined in handlers.folder)
        _.forEach(swaggerSpecs.paths, (path) => {
            _.forEach(path, (verb) => {
                verb["x-swagger-router-controller"] = undefined;
            });
        });
    }
};
