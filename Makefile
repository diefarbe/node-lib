all: docker-dist

# Run npm install and run-script build inside a Docker container
.PHONY: docker-dist
docker-dist:
	docker run --rm -it -v $(CURDIR):/work -w /work node make docker-target

# Command used inside Docker container; do not invoke directly
.PHONY: docker-target
docker-target:
	apt-get update && apt-get install -y libudev-dev libusb-1.0-0-dev
	npm install
	npm run-script build
