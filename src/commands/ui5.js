module.exports = {
  name: 'ui5',
  run: async toolbox => {
    const { print } = toolbox

    print.info('******* Bem vindo ao UI5 CLI *******')
    print.info('Criar página:')
    print.success('ui5 g page companyList')
    print.info('\nCriar página com parametros:')
    print.success('ui5 g page companyEdit docEntry')

    print.info('\nCriar fragmento:')
    print.success('ui5 g f companyEditFields')        
    
    print.info('\nCriar rota:')
    print.success('ui5 g r companyAnotherRoute')    
  }
}
