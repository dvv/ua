all: ua.json

ua.json:
	wget https://github.com/3rd-Eden/useragent/raw/v2.0/tests/fixtures/pgts.yaml
	node index.js

.PHONY: all
