"use client"
import React, { useState } from 'react';
import style from '@/app/styles/form-compliance.module.css';
import ImageDropzone from './form-compliance/utils/ImageDropzone';
import { Button, Image } from "@nextui-org/react";
import { Raleway } from 'next/font/google';
import Link from 'next/link';


const raleway = Raleway({ subsets: ['latin'], style: 'italic' })
const raleway2 = Raleway({ subsets: ['latin'] })


interface FormDataa {
    nombreYapellido: string;
    descripcion: string;
}

const Home: React.FC = () => {
    const [taskId, setTaskId] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [formDataa, setFormData] = useState<FormDataa>({
        nombreYapellido: '',
        descripcion: '',
    });
    const fechaActual = new Date();
    const timestampActual = fechaActual.getTime();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [selectionButton, setSelectionButton] = useState(true);
    const [showRegularForm, setShowRegularForm] = useState(false);
    const [showAnonymousForm, setShowAnonymousForm] = useState(false);
    const [backButton, setBackButton] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const resp = await fetch('https://contact.t-daggerla.com/api/clickup-compliance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `Denuncia - ${fechaActual}`,
                    description: 'test2',
                    markdown_description: `${formDataa.descripcion}`,
                    assignees: [183],
                    priority: 3,
                    due_date: timestampActual,
                    due_date_time: false,
                    notify_all: true,
                    parent: null,
                    links_to: null,
                    check_required_custom_fields: true,
                    custom_fields: [
                        {
                            id: 'e8ed4be5-7fea-437a-b03e-d37d653d62ab',
                            value: formDataa.nombreYapellido,
                        },
                        {
                            id: 'ec81db50-ce20-4d1a-94c2-d16f486cc002',
                            value: formDataa.descripcion,
                        },
                    ],
                }),
            });

            if (resp.ok) {
                const data = await resp.json();
                setTaskId(data.id);

                try {
                    const taskIdd = data.id;
                    const apiKey = process.env.NEXT_PUBLIC_CLICKUP_API_URL;
                    const query = new URLSearchParams({
                        custom_task_ids: 'true',
                        team_id: '9002029932'
                    }).toString();

                    if (selectedImage !== null) {
                        const formm = new FormData();
                        formm.append("attachment", selectedImage, selectedImage?.name || 'defaultFileName');

                        const response = await fetch(
                            `https://api.clickup.com/api/v2/task/${taskIdd}/attachment?${query}`,
                            {
                                method: 'POST',
                                headers: {
                                    Authorization: `${apiKey}`,
                                },
                                body: formm
                            }
                        );
                    }
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                }

                setSuccessMessage(true);
                setErrorMessage(false);
                setShowRegularForm(false);
                setShowAnonymousForm(false);

            } else {
                setSuccessMessage(false);
                setErrorMessage(true);
                setShowRegularForm(false);
                setShowAnonymousForm(false);
            }

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setSuccessMessage(false);
            setErrorMessage(true);
            setShowRegularForm(false);
            setShowAnonymousForm(false);
        }
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageDrop = (acceptedFiles: File[]) => {
        const imageFile = acceptedFiles[0];
        setSelectedImage(imageFile);
    };

    return (
        <main className={`${style.shape} flex min-h-screen flex-col items-center pb-12`}>
            <div className={`${style.description} container w-1/2 pt-8 pb-8`}>
                <p className={`${style.textDesc}`}>Descubre nuestro Código de Ética y Política de Gobierno Corporativo</p>
                <p className={`${style.textDesc}`}>En Latamly Group entendemos que para cumplir con nuestro Propósito, Misión y Visión como grupo de empresas, debemos actuar de manera inobjetable con Clientes, Socios, Proveedores, Competidores, Inversores y con la Comunidad toda. Para ayudar a lograrlo, contamos con una herramienta fundamental: nuestro Código de Ética y Política de Gobierno Corporativo.</p>
                <p className={`${style.textDesc}`}>La transparencia y la confianza son valores esenciales para quienes formamos parte de Latamly Group. El cumplimiento de la palabra y la actuación de buena fe en las relaciones contractuales, laborales e institucionales constituyen un compromiso esencial de nuestra corporación. Nuestro Código de Ética y Política de Gobierno Corporativo supone la afirmación de nuestro compromiso para con estos valores y principios.</p>
                <p className={`${style.textDesc}`}>
                    En Latamly Group estamos convencidos de que contar con un Código de Ética y Política de Gobierno Corporativo lleva al fortalecimiento de una cultura organizacional ética, sólida y sustentable, comprometida con la sustentabilidad y la innovación. Buscamos fomentar y consolidar una cultura corporativa de integridad y cumplimiento normativo, así como prevenir, detectar y responder de manera firme ante potenciales incumplimientos de leyes, regulaciones estatales y/o políticas internas de la empresa.
                </p>
                <p className={`${style.textDesc}`}>
                    Los responsables máximos por velar por el cumplimiento del Código de Ética y Política de Gobierno Corporativo es el Comité Directivo de la empresa. El Oficial de Cumplimiento (en nuestro caso, dicha función es ejercida por quien tiene a su cargo la Gerencia de Recursos Humanos) constituye la interfaz de comunicación primera para todas las denuncias, descubrimientos y/o reportes vinculados con aspectos detallados en el Código.
                </p>
                <p className={`${style.textDesc}`}>
                    Te invitamos a recorrer nuestro Código de Ética y Política de Gobierno Corporativo.
                </p>
            </div>
            <div className='pt-4 relative'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-0'>
                    <div className='lg:col-start-2 lg:col-span-1'>
                        <p className={`${raleway.className} font-raleway bg-[#FF0000] text-white text-[0.8rem] lg:text-[1.2rem] p-6 lg:p-12 rounded-[18px] relative z-10`}>Conocer en profundidad nuestra cultura institucional nos ayuda a alinear mejor nuestros objetivos para crecer hacia donde queremos crecer.</p>
                    </div>
                    <div className='h-[10rem] lg:h-[12rem] pl-8 lg:col-start-3 lg:col-span-2 flex flex-col justify-center bg-[#FFFFFF] shadow-xl  w-3/4 lg:w-2/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                        <p className={`${raleway2.className}text-[0.8rem] lg:text-[1.2rem] pb-4`}>Código de ética y gobierno corporativo</p>
                        <div className="flex justify-center">
                            <Link href="https://latamly.com/etica/" target='_blank'><Button className='bg-[#FF0000] text-[#FFFFFF] shadow-lg text-[0.8rem] lg:text-[1rem] h-6 lg:h-8 w-12 lg:w-16 rounded-full'>
                                Leer
                            </Button></Link>
                        </div>
                    </div>
                </div>
                {selectionButton && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Formulario de denuncia</p>
                            <div className='flex gap-6 flex-col pl-6 pt-6'>
                                <Button
                                    className={`${raleway2.className} bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[1rem] rounded-full w-[12rem] lg:w-[18rem] h-8 lg:h-10`}
                                    onClick={() => {
                                        setShowRegularForm(true);
                                        setShowAnonymousForm(false);
                                        setSelectionButton(false);
                                        setBackButton(true);
                                    }}
                                >
                                    Enviar denuncia
                                </Button>

                                <Button
                                    className={`${raleway2.className} bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[1rem] rounded-full w-[12rem] lg:w-[18rem] h-8 lg:h-10`}
                                    onClick={() => {
                                        setShowRegularForm(false);
                                        setShowAnonymousForm(true);
                                        setSelectionButton(false);
                                        setBackButton(true);
                                    }}
                                >
                                    Enviar denuncia anónima
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {showRegularForm && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Denuncia</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-full'>
                                        <input className='w-3/4 border-b border-gray-400'
                                            name='nombreYapellido'
                                            placeholder='Nombre y apellido'
                                            value={formDataa.nombreYapellido}
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div className="row-start-2">
                                        <textarea
                                            name='descripcion'
                                            placeholder='Mensaje'
                                            value={formDataa.descripcion}
                                            onChange={handleDescripcion}
                                            id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center row-start-2 gap-4 pr-32">
                                        <div className='border border-gray-400 w-32 h-28 rounded-lg text-center pt-1'>
                                            <ImageDropzone onImageDrop={handleImageDrop} />
                                        </div>
                                        <div className=''>
                                            <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Enviar</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {showAnonymousForm && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">
                            </Image>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Denuncia anónima</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="row-start-2">
                                        <textarea
                                            name='descripcion'
                                            placeholder='Mensaje'
                                            value={formDataa.descripcion}
                                            onChange={handleDescripcion}
                                            id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center row-start-2 gap-4 pr-32">
                                        <div className='border border-gray-400 w-32 h-28 rounded-lg text-center pt-1'>
                                            <ImageDropzone onImageDrop={handleImageDrop} />
                                        </div>
                                        <div className=''>
                                            <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Enviar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                )}
                {/* trabajando */}
                {successMessage && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">
                            </Image>
                        </div>

                        <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col justify-center bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[1.5rem]`}>Hemos recibido su denuncia. Muchas gracias.</p>
                        </div>

                    </div>
                )}
                {errorMessage && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">
                            </Image>
                        </div>

                        <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col justify-center bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[1.5rem]`}>Ocurrio un error al enviar el formulario. Intentalo mas tarde.</p>
                        </div>

                    </div>
                )}
                {/* trabajando */}


            </div>
            {backButton && (
                <div>
                    <button
                        className='border-solid border-2 border-red-600 rounded-lg p-1'
                        onClick={() => {
                            setShowRegularForm(false);
                            setShowAnonymousForm(false);
                            setSelectionButton(true);
                            setBackButton(false);
                            setSelectionButton(true);
                            setSuccessMessage(false);
                            setErrorMessage(false);

                        }}>
                        <Image
                            src="/latamly-arrow.png"
                            width={25}
                            height={25}
                            alt="Picture of the author">
                        </Image>

                    </button>
                </div>
            )}
        </main>
    )
}

export default Home;
