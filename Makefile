deploy:
	git checkout master
	npm run build
	git checkout gh-pages
	cp -r dist/* .
	cp index.html 404.html
	git add .
	git commit -m "build and release new version"
	git push origin gh-pages
	git checkout master
