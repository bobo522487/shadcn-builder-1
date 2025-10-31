import { useFormBuilderStore } from "@/stores/form-builder-store";
import { OptionsDialog } from "./dialogs/options-dialog";
import { useSelectedComponentModel } from "@/hooks/useComponentModels";


export function OptionsGroup() {
  const updateComponent = useFormBuilderStore((state) => state.updateComponent);
  const selectedComponent = useSelectedComponentModel();

  if (!selectedComponent) {
    return null;
  }

  const handleChange = (
    field: string,
    value: any,
    isValidForAllViewports: boolean = false
  ) => {
    if (selectedComponent) {
      updateComponent(
        selectedComponent.id,
        field,
        value,
        isValidForAllViewports
      );
    }
  };

  const showCheckbox =
    selectedComponent.type !== "radio" && selectedComponent.type !== "select";

  return (
    <OptionsDialog
      component={selectedComponent}
      onOptionsChange={(options) => handleChange("options", options, true)}
      showCheckbox={showCheckbox}
    />
  );
}
