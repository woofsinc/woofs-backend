SHELL := /bin/bash
CONTAINER_ID := $(shell docker ps -qf "name=woofs-backend")

.PHONY: help build run-local
.DEFAULT: help

help:
	@echo "make build"
	@echo "          Building project image"
	@echo "----------"
	@echo "make run-local"
	@echo "          Create project container"
	@echo "----------"
	@echo "make logs"
	@echo "          Getting container logs"
	@echo "----------"
	@echo "make run"
	@echo "          Build and run project"
	@echo "----------"
	@echo "make logs"
	@echo "          Get container logs"
	@echo "----------"
	@echo "make destroy"
	@echo "          Destroy project container"
	@echo "----------"

build:
	@echo "Building image..."
	@echo "----------"
	docker build . -t woofs-backend:latest

run-local:
	@echo "Creating container..."
	@echo "----------"
	docker run -p 3333:3333 -d --name woofs-backend woofs-backend:latest 

run: build run-local

logs:
	@echo "Getting container logs..."
	@echo "----------"
	docker logs -f ${CONTAINER_ID}

destroy:
	@echo "Removing container..."
	@echo "----------"
	docker stop ${CONTAINER_ID}
	docker rm ${CONTAINER_ID}

