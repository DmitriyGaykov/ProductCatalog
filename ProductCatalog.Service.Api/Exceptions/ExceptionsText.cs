using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Exceptions;

public static class ExceptionsText
{
    public const string FieldEmailsShouldNotBeEmpty = "Введите вашу электронную почту";
    public const string FieldPasswordShouldNotBeEmpty = "Введите ваш пароль";
    public const string EmailOrPasswordAreNotValid = "Неверный логин или пароль!";
    public const string TokenIsNotValid = "Невалидный токен авторизации";
    public const string UserWasNotFound = "Пользователь не найден";
    public const string UserWasBlocked = "Пользователь заблокирован по причине: ";
    public const string YouHaveNotPermission = "У вас не доступа к данному функционалу";
    public const string FirstNameLengthBetween1and50 = "Имя пользователя должно содержать от 1 до 50 символов";
    public const string LastNameLengthBetween1and50 = "Фамилия пользователя должна содержать от 1 до 50 символов";
    public const string EmailIsRequired = "Электронная почта обязательна";
    public const string EmailIsNotValid = "Введите валидную электронную почту";
    public const string PasswordIsNotValid = "Пароль должен содержать от 6 до 64 символов";
    public const string EmailWasRecerved = "Почта уже занята";
    public const string BlockWasNotFound = "Такой блокировки не существует";
    public const string BlockReasonIsNotValid = "Причина блокировки должна быть длиной от 2 до 300 символов";
    public const string AdminCannotBlockYourself = "Вы не можете забокировать самого себя";
    public const string UserHasBeenAlreadyBlocked = "Пользователь уже был заблокирован";
    public const string CategoryNameSizeIsNotValid = "Длина названия категории должна быть от 1 до 50 символов";
    public const string CategoryNameIsNotValid = "Название категории должно состоять из букв русского либо английского алфавита";
    public const string CategoryNameWasReserved = "Категория с таким названием уже есть";
    public const string CategoryWasNotFound = "Категория не найдена";
    public const string CategoryIsNotYours = "Вы не создатель категории";
    public const string ProductIdWasNotProvided = "Предоставьте идентификатор продукта";
    public const string ProductWasNotFound = "Такого продукта не существует";
    public const string AdvancedUserCannotRemoveProductOfAnotherAdvancedUser = "Вы не можете удалить продукт другого продвинутого пользователя";
    public const string ProductNameIsNotValid = "Название продукта должно состоять от 1 до 100 символов";
    public const string ProductDescriptionIsNotValid = "Название продукта должно состоять от 1 до 300 символов";
    public const string ProductNotesIsNotValid = "Примечание продукта должно состоять от 1 до 300 символов";
    public const string ProductSpecialNotesIsNotValid = "Специальное примечание продукта должно состоять до 300 символов";
    public const string ProductPriceIsNotValid = "Цена на продукт должна быть от 10 копеек до 10 тысяч рублей";
    public const string ProductCategoryIsRequired = "Заполните поле категории";
    public const string ProductIsNotYours = "Это не ваш продукт";
}
