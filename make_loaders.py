#!/usr/bin/env python3
"""Usage: python3 make_loaders.py OWNER REPO [BRANCH]
Writes one paste-ready Squarespace Code Block loader per page in pages/ into loaders/."""
import sys,os,glob
owner,repo=sys.argv[1],sys.argv[2];branch=sys.argv[3] if len(sys.argv)>3 else 'main'
T=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'loader.template.html')).read()
os.makedirs('loaders',exist_ok=True)
for f in sorted(glob.glob('pages/*.html')):
    n=os.path.basename(f)
    url=f'https://raw.githubusercontent.com/{owner}/{repo}/{branch}/pages/{n}'
    open('loaders/'+n.replace('.html','.loader.html'),'w').write(T.replace('__URL__',url))
    print(n,'->',url)
