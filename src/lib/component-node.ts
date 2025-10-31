import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { FormComponentModel } from "@/models/FormComponent";

export function nodeToModel(node: ComponentNode): FormComponentModel {
  return new FormComponentModel(JSON.parse(JSON.stringify(node)));
}

export function nodesToModels(nodes: ComponentNode[]): FormComponentModel[] {
  return nodes.map((node) => nodeToModel(node));
}

export function modelToNode(model: FormComponentModel): ComponentNode {
  return JSON.parse(JSON.stringify(model));
}

export function modelsToSchema(models: FormComponentModel[]): FormSchema {
  return {
    components: models.map((model) => modelToNode(model)),
  };
}
