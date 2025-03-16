import {Category, Product} from "../../models";
import {FC, useId, useState} from "react";
import {ActionForm, ActionFormFieldProps} from "../action-form";
import {useEditProductMutation} from "../../store";
import {toast} from "react-toastify";
import {extractErrors} from "../../utils";

export type EditProductMenuProps = {
  product: Product;
  categories: Category[];

  onEdit?: (category: Product) => void;
  onCancel?: () => void;
}

export const EditProductMenu: FC<EditProductMenuProps> = ({product, categories, onCancel, onEdit}) => {
  const blockId = useId();

  const [editProduct, {isLoading}] = useEditProductMutation()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [specialNotes, setSpecialNotes] = useState<string | null>(null);
  const [price, setPrice] = useState(10);
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const _editProduct = async () => {
    try {
      if (!categories.find(c => c.id === categoryId))
        return toast.warning('Заполнитель поле категории');

      const {data, error} = await editProduct({
        productId: product.id!,
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

      onEdit?.(data);
    } catch {
      toast.error('Ошибка при редактировании продукта');
    }
  }

  const fields: ActionFormFieldProps[] = [
    {
      label: 'Название: ',
      type: 'text',
      onValueChanged: setName,
      inputClassName: 'width-250',
      defaultValue: product.name,
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
      }))],
      defaultValue: product.category?.name,
    },
    {
      label: 'Описание: ',
      type: 'text',
      onValueChanged: setDescription,
      inputClassName: 'width-250',
      defaultValue: product.description,
    },
    {
      label: 'Стоимость в бел. руб.: ',
      type: 'number',
      onValueChanged: v => setPrice(parseFloat(v)),
      inputClassName: 'width-250',
      defaultValue: product.price?.toString(),
    },
    {
      label: 'Примечание общее: ',
      type: 'text',
      onValueChanged: setNotes,
      inputClassName: 'width-250',
      defaultValue: product.notes,
    },
    {
      label: 'Примечание специальное: ',
      type: 'text',
      onValueChanged: setSpecialNotes,
      inputClassName: 'width-250',
      defaultValue: product.specialNotes,
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
                  title={`Редактирование продукта ${product.name}`}
                  showCancel={true} onCancel={onCancel} onSubmit={_editProduct} className="max-width-600"
                  errors={errors}
                  blockSubmitButton={isLoading} submitButtonText="Редактировать"/>
    </div>
  )
}