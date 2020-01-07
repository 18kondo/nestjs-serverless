nestjs + serverless

# local

```
npm run build
```

http://localhost:3000 にアクセスする。

# sls deploy

distに出力されたhandlerをserverless.ymlに指定している

```
nest build
sls deploy
```

# linter

eslintに変更している

nestjsはangulaに準拠しているためtslintがデフォルト

`
tslint → eslint
`

# env

direnvを使用

```
direnv allow
```

## TODO 

- Lambda Layer
- DynamoDB Local
