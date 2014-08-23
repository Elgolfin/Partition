Partition
=========

Seamless node.js CMS

Installation
============

1. npm install https://github.com/Elgolfin/Partition.git
2. cd core
3. mklink /d current 1 (create a hardlink)



Blanket.js (Code Coverage) Setup
================================

1. npm install blanket --safe-dev
2. mocha --require blanket
3. Modify the package.json ("config": { "blanket": {"pattern": "Partition/core/" })
4. mocha -r blanket --recursive -R html-cov > coverage.html
5. https://github.com/Elgolfin/Partition/blob/master/coverage.html