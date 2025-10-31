import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { FormComponentModel } from "@/models/FormComponent";
import { Editor } from "@tiptap/react";
import { icons } from "lucide-react";
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { SubscriptionInfo } from './subscription.types';

export type SelectableComponents = {
  id: string;
  label: string;
  type: string;
  icon: keyof typeof icons;
};

export type Viewports = 'sm' | 'md' | 'lg';

export type DesignPropertiesViews = {
  base: React.ReactNode;
  grid: React.ReactNode;
  html: React.ReactNode;
  label: React.ReactNode;
  input: React.ReactNode;
  button: React.ReactNode;
  options: React.ReactNode;
  validation: React.ReactNode;
};

export type ReactCode = {
  template: string;
  logic?: string;
  dependencies: Record<string, string[] | string>;  
  thirdPartyDependencies?: string[];
};

export type TemplateData = {
  components: ComponentNode[];
  formTitle: string;
  formDescription: string;
  tags: string[];
  category: string;
};

export type HistorySnapshot = {
  schema: FormSchema;
  formTitle: string;
  formId: string | null;
  timestamp: number;
};

export type HistoryState = {
  snapshots: HistorySnapshot[];
  currentIndex: number;
  maxHistorySize: number;
};

export interface FormBuilderStore {
  mode: 'editor' | 'editor-preview' | 'preview' | 'export';
  viewport: Viewports;
  showJson: boolean;
  formId: string | null;
  formTitle: string;
  loadedTemplateId: string | null;
  loadedTemplate: TemplateData | null;
  editor: Editor | null;
  enableDragging: boolean;
  history: HistoryState;
  subscriptionInfo: SubscriptionInfo | null;
  schema: FormSchema;
  selectedComponentId: string | null;
  updateMode: (mode: FormBuilderStore['mode']) => void;
  updateViewport: (viewport: Viewports) => void;
  toggleJsonPreview: () => void;
  updateFormTitle: (title: string) => void;
  updateFormId: (id: string) => void;
  setEditor: (editor: Editor | null) => void;
  updateEnableDragging: (enableDragging: boolean) => void;
  addComponent: (component: FormComponentModel) => FormComponentModel;
  removeComponent: (componentId: string) => void;
  updateComponent: (componentId: string, field: string, value: any, isValidForAllViewports?: boolean, isDragging?: boolean) => void;
  updateComponents: (components: ComponentNode[]) => void;
  selectComponent: (componentId: string | null) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  duplicateComponent: (componentId: string) => void;
  applyTemplate: (templateData: TemplateData, options?: { templateKey?: string }) => void;
  clearForm: () => void;
  // History methods
  saveSnapshot: () => void;
  undo: () => boolean;
  redo: () => boolean;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
  jumpToSnapshot: (index: number) => boolean;
  // Subscription methods
  updateSubscriptionInfo: (subscriptionInfo: SubscriptionInfo) => void;
} 
