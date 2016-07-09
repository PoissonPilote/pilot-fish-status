# pilot-fish-status

[http://pilot-fish.cleverapps.io](http://pilot-fish.cleverapps.io)

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
curl https://pilot-fish.cleverapps.io/path \
  --data 'x=49.8&y=-3.8&depth=67' \
  --user <user>:<password>
```

## Contribute

```
npm install
npm run dev # run in dev mode with hot reload
npm start # start a regular server
```
