import {Category, Product} from "../../models";
import {FC, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useCreateProductMutation} from "../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../utils";

export type AddProductMenuProps = {
  categories: Category[];

  onAdd?: (category: Product) => void;
  onCancel?: () => void;
}

export const AddProductMenu: FC<AddProductMenuProps> = ({categories, onCancel, onAdd}) => {
  const blockId = useId();

  const [createProduct, {isLoading}] = useCreateProductMutation()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [specialNotes, setSpecialNotes] = useState<string | null>(null);
  const [price, setPrice] = useState(10);
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const _createProduct = async () => {
    try {
      if (!categories.find(c => c.id === categoryId))
        return toast.warning('Заполнитель поле категории');

      const {data, error} = await createProduct({
        name,
        description,
        notes,
        specialNotes,
        price,
        categoryId
      });
      if (error) {
        const errors = extractErrors(error);
        setErrors(errors);
        return;
      }

      onAdd?.(data);
    } catch {
      toast.error('Ошибка при добавлении продукта')
    }
  }

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Название: ',
      type: 'text',
      onValueChanged: setName,
      inputClassName: 'width-250',
    },
    {
      label: 'Категория: ',
      type: 'select',
      onValueChanged: setCategoryId,
      inputClassName: 'width-250',
      options: [{
        key: "",
        value: ""
      }, ...categories.map(c => ({
        key: c.id!,
        value: c.name!
      }))]
    },
    {
      label: 'Описание: ',
      type: 'text',
      onValueChanged: setDescription,
      inputClassName: 'width-250',
    },
    {
      label: 'Стоимость в бел. руб.: ',
      type: 'number',
      onValueChanged: v => setPrice(parseFloat(v)),
      inputClassName: 'width-250',
    },
    {
      label: 'Примечание общее: ',
      type: 'text',
      onValueChanged: setNotes,
      inputClassName: 'width-250',
    },
    {
      label: 'Примечание специальное: ',
      type: 'text',
      onValueChanged: setSpecialNotes,
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
                  title={`Добавление продукта`}
                  showCancel={true} onCancel={onCancel} onSubmit={_createProduct} className="max-width-600"
                  errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Добавить"/>
    </div>
  )
}