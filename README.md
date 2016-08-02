# Status API

[http://www.projetpoissonpilote.com/api](http://www.projetpoissonpilote.com/api)

- Position GPS triangulé
- Position estimée
- Profondeur
- Réserve d'oxygène
- Compteur de pédale (interpolé)
- Humeur de l'équipage
- Capteur physiologique?

Vu que certaines données seront transmises à la voix par le téléphone sonique,
ce serait intéressant d'avoir un système qui interpole les donnée (qui calcule
en direct une valeur estimée qu'on affine avec de vrais chiffres une fois par
jour.

## API endpoints

### `GET /api/path`

```json
{
  "<boat-id>": [
    {
      "position_id":"<uuid>",
      "point":{"x":<lat>,"y":<lon>},
      "depth":"<depth (meters)>",
      "datetime": "<iso8601 date>"
    }
  ]
}
```

Where `boat-id` is in `["boat-1", "boat-2", "sub"]`.

Available structured data:

- `x`: latitude of the vessel
- `y`: longitude of the vessel
- `depth`: depth in meters
- `oxygen`: Percentage of oxygen
- `paddle`: Paddling count
- `humor`: Humor of the crew
- `data`: Any other kind of data in the form `{type=<type>, value=<value>`

### `POST /api/data`

```
curl http://www.projetpoissonpilote.com/api/path \
  --data '<data>' \
  --user <user>:<password>
```

With the body in JSON:

```json
[{
    "boat-1": { // Optional, one for each boat
       "x": 49.3, // Optional
       "y": -2.0, // Optional
       "depth": 0, // Optional depth in meters. Overriden with 0 for the boats
    },
    "paddle": 0, // Optional number of paddle cycles since the start
    "oxygen": 45, // Optional percentage of available oxygen in the sub
    "data": [{"type": "type", "value": <value>}], // Optional unstructured data
    "datetime": "2016-07-18T00:00:00Z" // Optional ISO 8601 datetime (preferably UTC). Default: now()
}]
```

## Contribute

```
npm install
npm run dev # run in dev mode with hot reload
npm start # start a regular server
```
