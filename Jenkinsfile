def build_command = "npm run build"
if (env.BRANCH_NAME == 'master') {
    build_command = "npm run build"
}

standardPipeline {
    projectName = "leapin-saas-sdk"
    isMultiBranch = true
    isWebService = true
    buildCommand = {
        sh "${build_command}"
    }
    preBuildCommand = {
        sh "npm config set registry https://registry.npmmirror.com && npm install"
    }
    nodeVersion = "20.15.0"
    buildLocalPath = "build"
    isSkipDeploy = true
    isBuildUploadPathWithPackageJson = true
}