import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageToPackageJson,
} from './utils';

export const ngAdd = (): Rule => (tree: Tree) => {
  const workspaceConfig = tree.read('/angular.json');
  if (!workspaceConfig) {
    throw new SchematicsException('Could not find Angular workspace configuration');
  }
  return chain([
    addPackageJsonDependencies(),
    installPackageJsonDependencies(),
  ]);
};

const addPackageJsonDependencies = (): Rule => (host: Tree, context: SchematicContext) => {
  const dependencies: { name: string; version: string }[] = [{ name: '@ngneat/storage', version: '^1.0.0' }];

  dependencies.forEach((dependency) => {
    addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
    context.logger.log('info', `✅️ Added "${dependency.name}`);
  });

  return host;
};

const installPackageJsonDependencies = (): Rule => (host: Tree, context: SchematicContext) => {
  context.addTask(new NodePackageInstallTask());
  context.logger.log('info', `🔍 Installing packages...`);

  return host;
};
