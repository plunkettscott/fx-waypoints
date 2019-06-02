const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
const doc = yaml.safeLoad(fs.readFileSync(path.join(GetResourcePath(GetCurrentResourceName()), 'config.yml'), 'utf8'))

on('onResourceStart', async (resourceName) => {
    if (resourceName !== GetCurrentResourceName()) {
        return
    }

    RegisterCommand('test', () => {
        emitNet('Waypoints:Test', -1)
    })

    RegisterCommand('loadwp', () => {
        emitNet('Waypoints:YamlParsed', -1, JSON.stringify(doc))
    })

    console.log(`LESA Gaming's Waypoints -- Started.`)
})

RegisterNetEvent('Waypoints:SendTheYaml')
onNet('Waypoints:SendTheYaml', () => {
    emitNet('Waypoints:YamlParsed', source, JSON.stringify(doc))
})