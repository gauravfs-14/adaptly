.PHONY: demo-app build-package link-package test-package clean-package unlink-package create-tag push-tag release-tag

# Run the demo app
demo-app:
	cd examples/adaptly-demo && npm run dev

# Build the npm package using rollup
build-package:
	cd adaptly-lib && npm run rollup

# Clean the dist directory
clean-package:
	cd adaptly-lib && rm -rf dist

# Link the package locally for testing
link-package: build-package
	cd adaptly-lib && npm link
	cd examples/adaptly-demo && npm link adaptly
	# Copy built files directly to ensure Next.js can resolve them
	cd examples/adaptly-demo && rm -rf node_modules/adaptly && mkdir -p node_modules/adaptly
	cd examples/adaptly-demo && cp -r ../../adaptly-lib/dist node_modules/adaptly/
	cd examples/adaptly-demo && cp ../../adaptly-lib/package.json node_modules/adaptly/

# Test the package by building and linking
test-package: clean-package build-package link-package
	@echo "Package built and linked successfully!"
	@echo "You can now test it in the demo app with: make demo-app"

# Unlink the package
unlink-package:
	cd examples/adaptly-demo && npm unlink adaptly
	cd adaptly-lib && npm unlink

# Full rebuild and link
rebuild-package: clean-package build-package
	cd adaptly-lib && npm link
	cd examples/adaptly-demo && npm link adaptly
	# Copy built files directly to ensure Next.js can resolve them
	cd examples/adaptly-demo && rm -rf node_modules/adaptly && mkdir -p node_modules/adaptly
	cd examples/adaptly-demo && cp -r ../../adaptly-lib/dist node_modules/adaptly/
	cd examples/adaptly-demo && cp ../../adaptly-lib/package.json node_modules/adaptly/

# Create a new git tag
create-tag:
	@echo "Creating new tag..."
	@read -p "Enter tag version (e.g., v1.0.0): " TAG; \
	if [ -z "$$TAG" ]; then \
		echo "Error: Tag version is required"; \
		exit 1; \
	fi; \
	if git tag -l | grep -q "^$$TAG$$"; then \
		echo "Error: Tag $$TAG already exists"; \
		exit 1; \
	fi; \
	git tag -a $$TAG -m "Release $$TAG"; \
	echo "Tag $$TAG created successfully!"

# Push tags to remote
push-tag:
	@echo "Pushing tags to remote..."
	git push origin --tags
	@echo "Tags pushed successfully!"

# Create tag and push (complete release process)
release-tag: create-tag push-tag
	@echo "Release process completed!"
	@echo "You can now go to GitHub and create a release from the new tag."