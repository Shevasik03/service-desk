import style from './ApplacationTable.module.scss'

export const ApplicationTable = () => {

    return (
        <table className={style.applicationTable}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Назва</th>
                    <th>Категорія</th>
                    <th>Замовник</th>
                    <th>Виконавець</th>
                    <th>Статус</th>
                    <th>Таймер</th>
                    <th>Рішення</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                </tr>
            </tbody>
        </table>
    )
}