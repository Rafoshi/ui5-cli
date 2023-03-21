module.exports = {
  name: 'ui5c',
  run: async toolbox => {
    const { print } = toolbox

    print.info('******* Bem vindo ao UI5 CLI *******')
    print.info('Criar página:')
    print.success('ui5c g page companyList')
    
    print.info('\nCriar página com parametros:')
    print.success('ui5c g page companyEdit docEntry')

    print.info('\nCriar fragmento:')
    print.success('ui5c g f companyEditFields')        
    
    print.info('\nCriar rota:')
    print.success('ui5c g r companyAnotherRoute')    
  }
}
