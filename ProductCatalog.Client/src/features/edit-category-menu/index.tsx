import {Category} from "../../models";
import {FC, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useEditCategoryMutation} from "../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../utils";

export type EditCategoryMenuProps = {
  category: Category;
  onEdit?: (category: Category) => void;
  onCancel?: () => void;
}

export const EditCategoryMenu: FC<EditCategoryMenuProps> = ({category, onCancel, onEdit}) => {
  const blockId = useId();

  const [editCategory, { isLoading }] = useEditCategoryMutation()

  const [name, setName] = useState(category.name);
  const [errors, setErrors] = useState<string[]>([]);

  const _editCategory = async () => {
    try {
      if (name === category.name)
        return toast.warning('Вы ничего не изменили');

      const { data, error } = await editCategory({ categoryId: category.id!, name: name || "" });
      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      onEdit?.(data);
    } catch {
      toast.error('Ошибка при редактировании категории')
    }
  }

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Название: ',
      type: 'text',
      onValueChanged: setName,
      defaultValue: category.name,
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
                  title={`Изменение категории ${category.name}`}
                  showCancel={true} onCancel={onCancel} onSubmit={_editCategory} className="max-width-400"
                  errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Редактировать"/>
    </div>
  )
}