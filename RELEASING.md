# How to release

```
$ git flow release start <version>
*update version in package.json*
$ git commit -m "Bumped version to <version>."
$ git flow release finish <version>
$ git push --all
```
