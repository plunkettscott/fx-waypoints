let waypointData = {}
let waypointReceived = false

function getWaypoint(key) {
    const { waypoints } = waypointData

    return waypoints[key]
}

function getTeleporter(key) {
    const { teleporters } = waypointData

    return teleporters.filter((v) => {
        return v.goto === key
    })[0]
}

function getColor(key) {
    const { colors } = waypointData

    return colors[Object.keys(colors)
        .filter((v) => {
            return v === key
        })[0]]
}

function DisplayHelpText(str) {
	SetTextComponentFormat("STRING")
	AddTextComponentString(str)
    EndTextCommandDisplayHelp(0, 0, 1, -1)
}

onNet('Waypoints:YamlParsed', (data) => {
    waypointReceived = true
    waypointData = JSON.parse(data)

    console.log('Waypoint data has been loaded.')
})

on('onClientResourceStart', (resourceName) => {
    if (resourceName === GetCurrentResourceName()) {
        emitNet('Waypoints:SendTheYaml')
    }
})

setTick(() => {
    if (! waypointReceived) {
        return
    }

    const playerCoords = GetEntityCoords(GetPlayerPed(-1))
    const { teleporters, waypoints } = waypointData

    teleporters.forEach((teleporter) => {
        const { position, goto, color } = teleporter
        const teleporterDistance = GetDistanceBetweenCoords(
            playerCoords[0], playerCoords[1], playerCoords[2],
            position.x, position.y, position.z, true
        )

        if (teleporterDistance <= 7.5) {
            const co = getColor(color)
            DrawMarker(1, position.x, position.y, position.z, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 0.8, 0.8, 0.8, co.r, co.g, co.b, co.alpha, false, true, 2, true, false, false, false)

            if (teleporterDistance <= 1.5) {
                DisplayHelpText(`Press ~INPUT_PICKUP~ to Enter ${getWaypoint(goto).name}`)

                if (IsControlJustPressed(0, 153)) {
                    const { to } = getWaypoint(goto)
    
                    SetEntityCoords(PlayerPedId(), to.x, to.y, to.z)
                }
            }
        }
    })

    Object.keys(waypoints).forEach((waypointKey) => {
        const { name, to } = waypoints[waypointKey]
        const { position, color } = getTeleporter(waypointKey)
        const waypointDistance = GetDistanceBetweenCoords(
            playerCoords[0], playerCoords[1], playerCoords[2],
            to.x, to.y, to.z, true
        )

        if (waypointDistance <= 7.5) {
            const co = getColor(color)
            DrawMarker(1, to.x, to.y, to.z, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 0.8, 0.8, 0.8, co.r, co.g, co.b, co.alpha, false, true, 2, true, false, false, false)

            if (waypointDistance <= 1.5) {
                DisplayHelpText(`Press ~INPUT_PICKUP~ to Leave`)

                if (IsControlJustPressed(0, 153)) {    
                    SetEntityCoords(PlayerPedId(), position.x, position.y, position.z)
                }
            }
        }
    })
})
