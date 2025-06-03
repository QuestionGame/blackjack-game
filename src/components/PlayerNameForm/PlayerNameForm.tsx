// src/components/PlayerNameForm/PlayerNameForm.tsx
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerName, selectPlayerName } from '../../store/gameSlice';
import type { AppDispatch } from '../../store';
import styles from './PlayerNameForm.module.css'; // Створимо цей файл

interface IFormInput {
  playerName: string;
}

const PlayerNameForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPlayerName = useSelector(selectPlayerName);
  const { register, handleSubmit, setValue, formState: { errors, isDirty, isValid } } = useForm<IFormInput>({
    mode: "onChange", // Валідація при зміні
    defaultValues: {
      playerName: currentPlayerName || ""
    }
  });

  // Якщо ім'я змінюється в store (наприклад, завантажується з localStorage), оновлюємо форму
  useEffect(() => {
    if (currentPlayerName) {
      setValue('playerName', currentPlayerName, { shouldValidate: true, shouldDirty: true });
    }
  }, [currentPlayerName, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(setPlayerName(data.playerName.trim()));
    // Можна додати повідомлення про успішне збереження імені, якщо потрібно
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="playerName" className={styles.label}>Введіть ваше ім'я:</label>
      <input
        id="playerName"
        {...register("playerName", { 
            required: "Ім'я не може бути порожнім", 
            minLength: { value: 2, message: "Ім'я має містити принаймні 2 символи" },
            maxLength: { value: 20, message: "Ім'я не може бути довшим за 20 символів" },
            pattern: { value: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/u, message: "Дозволені тільки літери, пробіли, дефіси, апострофи" }
        })}
        className={styles.input}
        placeholder="Ваше ім'я"
        autoComplete="nickname"
      />
      {errors.playerName && <p className={styles.errorMessage}>{errors.playerName.message}</p>}
      
      <button type="submit" disabled={!isDirty || !isValid} className={styles.submitButton}>
        Зберегти ім'я
      </button>
    </form>
  );
};

export default PlayerNameForm;