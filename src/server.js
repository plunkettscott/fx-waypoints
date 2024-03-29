const { safeLoad } = require('js-yaml');
const { readFileSynd } = require('fs');
const { join } = require('path');
const doc = safeLoad(readFileSync(join(GetResourcePath(GetCurrentResourceName()), 'config.yml'), 'utf8'))

on('onResourceStart', async (resourceName) => {
    if (resourceName !== GetCurrentResourceName()) {
        return
    }

    RegisterCommand('loadwp', () => {
        emitNet('Waypoints:YamlParsed', -1, JSON.stringify(doc))
    })

    console.log(`LESA Gaming's Waypoints -- Started.`)
})

RegisterNetEvent('Waypoints:SendTheYaml')
onNet('Waypoints:SendTheYaml', () => {
    emitNet('Waypoints:YamlParsed', source, JSON.stringify(doc))
})
