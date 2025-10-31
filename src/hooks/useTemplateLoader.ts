import { useCallback, useRef } from "react";
import { fetchTemplate } from "@/lib/templates";
import { TemplateData } from "@/types/form-builder.types";

interface UseTemplateLoaderOptions {
  onLoaded?: (template: TemplateData, info: { templateName: string; templateKey?: string | undefined }) => void;
  onError?: (error: unknown) => void;
}

interface UseTemplateLoaderReturn {
  loadTemplate: (templateName: string, templateKey?: string) => Promise<TemplateData>;
}

export function useTemplateLoader(options: UseTemplateLoaderOptions = {}): UseTemplateLoaderReturn {
  const { onLoaded, onError } = options;
  const controllerRef = useRef<number>(0);

  const loadTemplate = useCallback(async (templateName: string, templateKey?: string) => {
    const invocation = controllerRef.current + 1;
    controllerRef.current = invocation;

    try {
      const templateData = await fetchTemplate(templateName, templateKey);
      if (controllerRef.current !== invocation) {
        // 已被更新的调用覆盖，忽略结果
        return templateData;
      }
      onLoaded?.(templateData, { templateName, templateKey });
      return templateData;
    } catch (error) {
      onError?.(error);
      throw error;
    }
  }, [onLoaded, onError]);

  return { loadTemplate };
}
