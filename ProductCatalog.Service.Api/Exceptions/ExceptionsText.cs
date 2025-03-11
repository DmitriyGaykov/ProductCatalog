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
    public const string FirstNameLengthBetween1and50 = "Имя пользователя долэно содержать от 1 до 50 символов";
    public const string LastNameLengthBetween1and50 = "Имя пользователя долэно содержать от 1 до 50 символов";
    public const string EmailIsRequired = "Электронная почта обязательна";
    public const string EmailIsNotValid = "Введите валидную электронную почту";
    public const string PasswordIsNotValid = "Пароль должен содержать от 6 до 64 символов";
    public const string EmailWasRecerved = "Почта уже занята";
}
