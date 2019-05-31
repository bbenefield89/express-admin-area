class ModelConfigurator {

  private static models: object[] = null

  public static configureModels(models: object[]): object {
    ModelConfigurator.setModels(models)
    ModelConfigurator.addModelScope()
    return ModelConfigurator.arrayToObject()
  }

  public static setModels(models: object[]): void {
    ModelConfigurator.models = models
  }

  public static addModelScope(): void {
    const models: object[] = ModelConfigurator.models.map((model: any) => {
      try {
        model.model.scope('expressAdminArea')
      }
      catch (_e) {
        model.model.addScope('expressAdminArea', {})
      }
      return model
    })
    ModelConfigurator.models = models
  }

  public static arrayToObject(): object {
    const models: object = {}
    ModelConfigurator.models.forEach((model: any): void => {
      const modelNameLowerCase: string = model.model.name.toLowerCase()
      models[modelNameLowerCase] = model.model
    })
    return models
  }

}

export { ModelConfigurator }