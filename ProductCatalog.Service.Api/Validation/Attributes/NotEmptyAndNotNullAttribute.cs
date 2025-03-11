using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Validation.Attributes;

public class NotEmptyAndNotNullAttribute : ValidationAttribute
{
    private int _minLength = -1;
    private int _maxLength = -1;
    private bool _allowNull = false;

    public NotEmptyAndNotNullAttribute()
    {
    }

    public int MinLength
    {
        get => _minLength;
        set => _minLength = value;
    }

    public int MaxLength
    {
        get => _maxLength;
        set => _maxLength = value;
    }

    public bool AllowNull
    {
        get => _allowNull;
        set => _allowNull = value;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var str = (value as string)?.Trim();

        if (AllowNull && str is null)
            return ValidationResult.Success;

        if (string.IsNullOrWhiteSpace(str))
            return new ValidationResult(ErrorMessage is null ? $"Данное поле не должно быть пустым" : ErrorMessage);

        if (_minLength >= 0 && str.Length < _minLength)
            return new ValidationResult(ErrorMessage is null ? $"Длина данного поля должна быть более, чем {_minLength}" : ErrorMessage);

        if (_maxLength >= 0 && str.Length > _maxLength)
            return new ValidationResult(ErrorMessage is null ? $"Длина данного поля должна быть менее, чем {_maxLength}" : ErrorMessage);

        return ValidationResult.Success;
    }
}