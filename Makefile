all: ua.json

ua.json: pgts.yaml
	node index.js

pgts.yaml:
	wget https://github.com/3rd-Eden/useragent/raw/master/tests/fixtures/pgts.yaml

.PHONY: all
