import style from './FormAcceptanceTicket.module.scss'
import { useState } from 'react'
import { arrayUsersInformation, arrayStatus, arrayTicketsSetting } from '../../../redux/slice/TicketSlice'
import { useAppDispatch } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { selectTicket } from '../../../redux/slice/TicketSlice'
import { onHidenTicketCard } from '../../../redux/slice/TicketSlice'
import { uploadTicket } from '../../../redux/slice/TicketSlice'



export const FormAcceptanceTicket = () => {

    const { temporaryTicketId, tickets } = useSelector(selectTicket)

    const currentTicket = tickets[temporaryTicketId];
    const subCategoryList = arrayTicketsSetting.find((item) => item.category === currentTicket.category)

    console.log(subCategoryList)
    
    const [inputTitle, setInputTitle] = useState<string>(currentTicket.title ?? '')
    const [selectSubcategory, setSelectSubcategory] = useState<string>(currentTicket.subcategory ?? '')
    const [inputDescription, setInputDescription] = useState<string>(currentTicket.description ?? '')
    const [selectStatus, setSelectStatus] = useState<string>(currentTicket.status ?? '')
    const [selectExecutant, setSelectExecutant] = useState<string>(currentTicket.executant ?? '')
    const [inputClient, setInputClient] = useState<string>(currentTicket.client ?? '')
    const [selectDateStart, setSelectDateStart] = useState({
        dateStart: currentTicket.objDateStart?.dateStart ?? '',
        timeStart: currentTicket.objDateStart?.timeStart ?? '',
    })
    const [selectDateEnd, setSelectDateEnd] = useState({
        dateEnd: currentTicket.objDateEnd?.dateEnd ?? '',
        timeEnd: currentTicket.objDateEnd?.timeEnd ?? '',
    })

    console.log(selectSubcategory)

    const dispatch = useAppDispatch()

    const onHidenTicket = () => {
        dispatch(onHidenTicketCard())
    }

    const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.target.value)
    }

    const handleSelectSubcategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectSubcategory(event.target.value)
    }

    const handleInputDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputDescription(event.target.value)
    }

    const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectStatus(event.target.value)
    }

    const handleInputClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputClient(event.target.value)
    }

    const handleSelectExecutant = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectExecutant(event.target.value)
    }

    const hanldeInputDateStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDateStart((prev) => ({
            ...prev,
            dateStart: event.target.value
        }))
    }

    const hanldeInputTimeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDateStart((prev) => ({
            ...prev,
            timeStart: event.target.value
        }))
    }
    const hanldeInputDateEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDateEnd((prev) => ({
            ...prev,
            dateEnd: event.target.value
        }))
    }

    const hanldeInputTimeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDateEnd((prev) => ({
            ...prev,
            timeEnd: event.target.value
        }))
    }

    const currentDateTime = (value: string) => {

        const currentDate = String(new Date().getDate()).padStart(2, '0');
        const currentYear = new Date().getFullYear();
        const currentMonth = String(new Date().getMonth()+ 1).padStart(2, '0') ;
        const currentHours = String(new Date().getHours()).padStart(2, '0');
        const currentMinutes = String(new Date().getMinutes()).padStart(2, '0');
        
        if (value === 'start') {
            setSelectDateStart({
                dateStart: `${currentYear}-${currentMonth}-${currentDate}`,
                timeStart: `${currentHours}:${currentMinutes}` ,
            })
        } else {
            setSelectDateEnd({
                dateEnd: `${currentYear}-${currentMonth}-${currentDate}`,
                timeEnd: `${currentHours}:${currentMinutes}` ,
            })
        }
        
    }


    const newTicket = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Форма відправлена');

        const objTicket = {
            id: currentTicket.id,
            title: inputTitle,
            category: currentTicket.category,
            subcategory: selectSubcategory,
            description: inputDescription,
            status: selectStatus,
            client: inputClient,
            executant: selectExecutant,
            objDateStart: selectDateStart,
            objDateEnd: selectDateEnd,
        }

        dispatch(uploadTicket(objTicket))
        dispatch(onHidenTicketCard())
    }

    return (
        <section className={style.formCreateApplication}>
            <form onSubmit={newTicket}>
                <section className={`${style.formHeader} flex-sb`}>
                    <h1>Створення заявки</h1>
                    <img onClick={() => onHidenTicket()} src="/src/assets/img/closeIcon.svg" alt="" />
                </section>
                <article>
                    <fieldset>
                        <div>
                            <label htmlFor="title">Назва звернення:</label>
                            <input name="title" id="title" placeholder='Введіть назву звернення' type='text' value={inputTitle} onChange={handleInputTitle}></input>
                        </div>

                        <div>
                            <label htmlFor="category">Категорія:</label>
                            <p id='category'>{currentTicket.category}</p>
                        </div>

                        {/* <div>
                            <label htmlFor="subcategory">Підкатегорія</label>
                            <select name="subcategory" id="subcategory" value={selectSubcategory} onChange={handleSelectSubcategory}>
                                <option value="Виберіть підкатегорію">Виберіть підкатегорію</option>
                                {selectSubcategory.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                            </select>
                        </div> */}

                        <div>
                            <label htmlFor="description">Опис:</label>
                            <textarea name="description" id="description" placeholder='Введіть опис звернення' value={inputDescription} onChange={handleInputDescription}></textarea>
                        </div>

                        <div>
                            <label htmlFor="status">Статус:</label>
                            <select name="status" id="status" value={selectStatus} onChange={handleSelectStatus}>
                                <option value="Нова">Нова</option>
                                {arrayStatus.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="customer">Замовник:</label>
                            <input name="customer" id="customer" placeholder="Введіть ім`я замовника" type='text' value={inputClient} onChange={handleInputClient}></input>
                        </div>

                        <div>
                            <label htmlFor="executant">Виконавець:</label>
                            <select name="executant" id="executant" value={selectExecutant} onChange={handleSelectExecutant}>
                                <option value="Виберіть виконавця">Виберіть виконавця</option>
                                {arrayUsersInformation.map((item, index) => (<option key={index} value={item.user}>{item.user}</option>))}
                            </select>
                        </div>

                        <div className={style.dateSelect}>
                            <label htmlFor="dateStart">Дата взяття в роботу:</label>
                            <div className='flex-sb'>
                                <input type="date"  value={selectDateStart.dateStart} onChange={hanldeInputDateStart}/>
                                <input type="time" name="timeStart" id="timeStart" value={selectDateStart.timeStart} onChange={hanldeInputTimeStart}/>
                            </div>
                            <button type='button' onClick={() => currentDateTime('start')}>Встановити поточну дату та час</button>
                        </div>

                        <div className={style.dateSelect}>
                            <label htmlFor="dateEnd">Термін виконання:</label>
                            <div className='flex-sb'>
                                <input type="date" value={selectDateEnd.dateEnd} onChange={hanldeInputDateEnd}/>
                                <input type="time" name="timeEnd" id="timeEnd" value={selectDateEnd.timeEnd} onChange={hanldeInputTimeEnd}/>
                            </div>
                            <button type='button' onClick={() => currentDateTime('end')}>Встановити поточну дату та час</button>
                        </div>
                    </fieldset>

                    <fieldset className={style.formBtn}>
                        
                        <button type='submit' className={style.doneBtn} >Затвердити</button>
                        <button type='reset' className={style.removeBtn} onClick={() => onHidenTicket()}>Відхилити</button>
                        <button>Відміна</button>
                       
                    </fieldset>
                </article>

            </form>
        </section>
    )
}