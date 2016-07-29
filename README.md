# Status API

[http://www.projetpoissonpilote.com/api](http://www.projetpoissonpilote.com/api)

- Position GPS triangulé
- Position estimée
- Profondeur
- Réserve d'oxygène
- Compteur de pédale (interpolé)
- Capteur physiologique

Vu que certaines données seront transmises à la voix par le téléphone sonique,
ce serait intéressant d'avoir un système qui interpole les donnée (qui calcule
en direct une valeur estimée qu'on affine avec de vrais chiffres une fois par
jour.

## API endpoints

### `GET /path`

```json
[
  {
    "position_id":"<uuid>",
    "point":{"x":<lat>,"y":<lon>},
    "depth":"<depth (meters)>",
    "datetime": "<iso8601 date>"
  }
]
```

### `POST /path`

```
curl http://www.projetpoissonpilote.com/api/path \
  --data '<data>' \
  --user <user>:<password>
```

`data` can be either *formUrlEncoded* (default) or *JSON* (in that case, don't
forget the `Content-Type: application/json` header.

```json
{
    "x": 49.3, // Mandatory latitude
    "y": -2.0, // Mandatory longitude
    ["depth": 0,] // Optional depth in meters. Overriden with 0 for the boats
    ["datetime": "2016-07-18T00:00:00Z"] // Optional ISO 8601 datetime (preferably UTC). Default: now()
}
```

## Contribute

```
npm install
npm run dev # run in dev mode with hot reload
npm start # start a regular server
```
