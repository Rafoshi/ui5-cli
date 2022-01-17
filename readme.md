# ui5 CLI

Interface de linha de comandos para SAP ui5.

## Como usar

Pre Requisitos:
* Clonar esse projeto
* rodar comando npm link dentro da pasta do projeto

Criar página:
```shell
$ ui5 g page <NomeDaPágina>
```
// Esse comando gera o template xml, controller e adiciona a rota no manifest.json

Criar fragmento:
```shell
$ ui5 g fragment <NomeDoFramento>
```
//Esse comando gera o template pada um fragmento 

Criar Rota:
```shell
$ ui5 g rota <NomeDaRota>
```
//Esse comando gera a roda e modifica o arquivo manifest.json
# License

MIT - see LICENSE


Exeplo instalação 
```bash
danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan
$ https://github.com/Daancustodio/ui5-cli.git
bash: https://github.com/Daancustodio/ui5-cli.git: No such file or directory

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan
$ git clone https://github.com/Daancustodio/ui5-cli.git
Cloning into 'ui5-cli'...
remote: Enumerating objects: 208, done.
remote: Counting objects: 100% (53/53), done.
remote: Compressing objects: 100% (26/26), done.
remote: Total 208 (delta 44), reused 27 (delta 27), pack-reused 155
Receiving objects: 100% (208/208), 109.56 KiB | 2.49 MiB/s, done.
Resolving deltas: 100% (98/98), done.

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan
$ cd ui5-cli/

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ npm install

> core-js@2.6.9 postinstall C:\Users\danpc\Documents\Projetos\dan\ui5-cli\node_modules\core-js
> node scripts/postinstall || echo "ignore"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
> https://opencollective.com/core-js
> https://www.patreon.com/zloirock

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 845 packages from 436 contributors and audited 913 packages in 93.416s
found 265 vulnerabilities (14 low, 71 moderate, 150 high, 30 critical)
  run `npm audit fix` to fix them, or `npm audit` for details

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ npm link
npm WARN acorn-jsx@5.0.1 requires a peer of acorn@^6.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

audited 913 packages in 47.451s
found 265 vulnerabilities (14 low, 71 moderate, 150 high, 30 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
C:\Users\danpc\AppData\Roaming\npm\ui5 -> C:\Users\danpc\AppData\Roaming\npm\node_modules\ui5\bin\ui5
C:\Users\danpc\AppData\Roaming\npm\node_modules\ui5 -> C:\Users\danpc\Documents\Projetos\dan\ui5-cli

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ corepack enable
bash: corepack: command not found

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ npm i -g corepack
C:\Users\danpc\AppData\Roaming\npm\pnpx -> C:\Users\danpc\AppData\Roaming\npm\node_modules\corepack\dist\pnpx.js
C:\Users\danpc\AppData\Roaming\npm\pnpm -> C:\Users\danpc\AppData\Roaming\npm\node_modules\corepack\dist\pnpm.js
C:\Users\danpc\AppData\Roaming\npm\yarn -> C:\Users\danpc\AppData\Roaming\npm\node_modules\corepack\dist\yarn.js
C:\Users\danpc\AppData\Roaming\npm\corepack -> C:\Users\danpc\AppData\Roaming\npm\node_modules\corepack\dist\corepack.js
C:\Users\danpc\AppData\Roaming\npm\yarnpkg -> C:\Users\danpc\AppData\Roaming\npm\node_modules\corepack\dist\yarnpkg.js
+ corepack@0.10.0
added 1 package in 1.887s

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ yarn global add gluegun
yarn global v1.22.15
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "gluegun@4.7.1" with binaries:
      - gluegun
Done in 17.40s.

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ yarn link
yarn link v1.22.15
success Registered "ui5".
info You can now run `yarn link "ui5"` in the projects where you want to use this package and it will be used instead.
Done in 0.12s.

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ ui5 g p Config
C:\Users\danpc\Documents\Projetos\dan\ui5-cli\node_modules\gluegun\build\index.js:13
    throw up;
    ^

TypeError: Cannot read property 'includes' of undefined
    at createLabel (C:\Users\danpc\Documents\Projetos\dan\ui5-cli\src\extensions\cli-extension.js:98:13)

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ npm -v
6.14.12

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ yarn -v
1.22.15

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/ui5-cli (master)
$ cd ..

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan
$ ls
BarberShop/  MyUI5WebAppDemo/  devbarber/  sapui5-yeoman-generetor/  ui5-cli/  vendafacil-fullcode/

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan
$ cd MyUI5WebAppDemo/

danpc@DESKTOP-B2VAPSI MINGW64 ~/Documents/Projetos/dan/MyUI5WebAppDemo (master)
$ ui5 g p Configuracoes
i18n Alterado webapp/i18n/i18n.properties
--Adicionado: Commom.Configuracoes=Configuracoes
JSON MENU alterado: webapp/model/data/AppModel.json
--Adicionado menu: key=Configuracoes title=Commom.Configuracoes
Manifest Alterado: webapp/manifest.json
--Adicionado nova rota: Configuracoes
--Adicionado target para rota: Configuracoes
VIEW CRIADA: webapp/src/pages/Configuracoes/Configuracoes.view.xml
CONTROLLER CRIADO: webapp/src/pages/Configuracoes/Configuracoes.controller.js
```
