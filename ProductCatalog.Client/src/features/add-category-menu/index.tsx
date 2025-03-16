import {Category} from "../../models";
import {FC, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useCreateCategoryMutation} from "../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../utils";

export type AddCategoryMenuProps = {
  onAdd?: (category: Category) => void;
  onCancel?: () => void;
}

export const AddCategoryMenu: FC<AddCategoryMenuProps> = ({onCancel, onAdd}) => {
  const blockId = useId();

  const [createCategory, { isLoading }] = useCreateCategoryMutation()

  const [name, setName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const _createCategory = async () => {
    try {

      const { data, error } = await createCategory({ name });
      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      onAdd?.(data);
    } catch {
      toast.error('Ошибка при редактировании категории')
    }
  }

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Название: ',
      type: 'text',
      onValueChanged: setName,
      inputClassName: 'width-250',
    },
  ];

  return (
    <div
      id={blockId}
      className="d-flex align-items-center blur-dark-bg justify-content-center min-vh-100 min-vw-100 position-absolute"
      style={{top: 0, left: 0}}
      onClick={e => (e.target as any)['id'] === blockId && onCancel?.()}
    >
      <ActionForm fields={fields}
                  title={`Добавление новой категории`}
                  showCancel={true} onCancel={onCancel} onSubmit={_createCategory} className="max-width-400"
                  errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Добавить"/>
    </div>
  )
}