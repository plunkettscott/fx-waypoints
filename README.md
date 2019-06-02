# Waypoints

This script provides an easy way to create enter/exit teleportation markers in GTA. The marker colors can be customized on a per-waypoint basis. The script is controlled via the `config.yml` file. The file is broken down into the following sections:

 1. `colors`

    The colors section provides an object of colors that markers can be set to use. Each color has standard rgba options.

 2. `waypoints`

    The waypoints section provides an object of points of interest that can be associated with teleporters. A waypoint can be assigned to only one teleporter currently, I plan to allow multiple teleporters per waypoint in the future. Players may press the `INPUT_PICKUP` control (`E` on keyboard) to go to the associated teleporter.

 3. `teleporters`

    The teleporters section provides an array of entrance teleporters that can be associated with a waypoint. Teleporters offer the ability for the player to teleport to the specified waypoint at the press of the `INPUT_PICKUP` control, which is `E` on keyboard.