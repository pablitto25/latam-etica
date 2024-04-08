"use client"
import React, { useState } from 'react';
import style from '@/app/styles/form-compliance.module.css';
import ImageDropzone from '../form-compliance/utils/ImageDropzoneEn';
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
            <div className={`${style.description} container w-3/4 lg:w-1/2 pt-8 pb-8`}>
                <p className={`${style.textDesc} font-bold`}>Discover our Code of Ethics and Corporate Governance Policy</p>
                <p className={`${style.textDesc}`}>At Latamly Group, we understand that in order to fulfill our Purpose, Mission, and Vision as a group of companies, we must act impeccably towards Clients, Partners, Suppliers, Competitors, Investors, and the entire Community. To help achieve this, we have a fundamental tool: our Code of Ethics and Corporate Governance Policy.</p>
                <p className={`${style.textDesc}`}>Transparency and trust are essential values for those of us who are part of Latamly Group. Keeping our word and acting in good faith in contractual, labor, and institutional relationships constitute an essential commitment of our corporation. Our Code of Ethics and Corporate Governance Policy signifies the affirmation of our commitment to these values and principles.</p>
                <p className={`${style.textDesc}`}>
                    At Latamly Group, we are convinced that having a Code of Ethics and Corporate Governance Policy leads to the strengthening of an ethical, solid, and sustainable organizational culture, committed to sustainability and innovation. We seek to foster and consolidate a corporate culture of integrity and compliance with regulations, as well as to prevent, detect, and respond firmly to potential violations of laws, state regulations, and/or internal company policies.
                </p>
                <p className={`${style.textDesc}`}>
                    The ultimate responsibility for ensuring compliance with the Code of Ethics and Corporate Governance Policy lies with the company&apos;s Management Committee. The Compliance Officer (in our case, this function is carried out by the person in charge of the Human Resources Management) serves as the primary communication interface for all complaints, discoveries, and/or reports related to aspects detailed in the Code.
                </p>
                <p className={`${style.textDesc}`}>
                    We invite you to explore our Code of Ethics and Corporate Governance Policy.
                </p>
            </div>
            <div className='pt-4 relative'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-0 text-[0.8rem] lg:text-[1.2rem]'>
                    <div className='lg:col-start-2 lg:col-span-1'>
                        <p className={`${raleway.className} font-raleway bg-[#FF0000] text-white p-6 lg:p-16 rounded-[18px] relative z-10`}>Knowing our institutional culture in depth helps us better align our goals to grow in the direction we want to grow.</p>
                    </div>
                    <div className='h-[8.5rem] lg:h-[12rem] pl-8 lg:col-start-3 lg:col-span-2 flex flex-col justify-center bg-[#FFFFFF] shadow-xl  w-6/6 lg:w-2/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                        <p className={`${raleway2.className} pb-4`}>Check out our Code of Ethics and Corporate Responsibility here.</p>
                        <div className="flex justify-center">
                            <Link href="https://latamly.com/etica/index2.html" target='_blank'><Button className='bg-[#FF0000] text-[#FFFFFF] shadow-lg text-[0.8rem] lg:text-[1rem] h-6 lg:h-8 w-12 lg:w-16 rounded-full'>
                                Read
                            </Button></Link>
                        </div>
                    </div>
                </div>

                {selectionButton && (
                    <div className='grid grid-cols-6 pt-12'>
                        <div className=' col-start-2 col-span-2 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <div className='col-start-4 col-span-2 pt-16 bg-[#FFFFFF] rounded-t rounded-b rounded-r-[25px]'>
                            <div className='grid cols-1'>
                                <div className=''>
                                    <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem] pl-9`}>Complaint Form</p>
                                </div>
                                <div className='grid grid-cols-1 gap-4 pl-8 pt-8'>
                                    <Button
                                        className={`${raleway2.className} bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[1rem] rounded-full w-[12rem] lg:w-[18rem] h-8 lg:h-10`}
                                        onClick={() => {
                                            setShowRegularForm(true);
                                            setShowAnonymousForm(false);
                                            setSelectionButton(false);
                                            setBackButton(true);
                                        }}
                                    >
                                        Report form
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
                                        Anonymous report form
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showRegularForm && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='col-span-2 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <div className='col-span-2 lg:col-span-1 pb-8'>
                            <form onSubmit={handleSubmit}>
                                <div className='pl-8 pt-12 bg-[#FFFFFF] lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                    <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Report</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <input className='w-3/4 border-b border-gray-400'
                                                name='nombreYapellido'
                                                placeholder='Name and last name'
                                                value={formDataa.nombreYapellido}
                                                onChange={handleName}
                                            />
                                        </div>
                                        <div className=" lg:col-span-1">
                                            <textarea
                                                name='descripcion'
                                                placeholder='Message'
                                                value={formDataa.descripcion}
                                                onChange={handleDescripcion}
                                                id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                        </div>
                                        <div className=" lg:col-span-1">
                                            <div className='grid grid-cols-1 gap-4'>
                                                <div className='col-span-1 border border-gray-400 w-32 h-28 rounded-lg pt-1'>
                                                    <ImageDropzone onImageDrop={handleImageDrop} />
                                                </div>
                                                <div className="col-span-1 pl-9">
                                                    <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Send</Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
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
                            <div className='pl-8 pt-12 bg-[#FFFFFF] lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Anonymous report</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className=" lg:col-span-1">
                                        <textarea
                                            name='descripcion'
                                            placeholder='Message'
                                            value={formDataa.descripcion}
                                            onChange={handleDescripcion}
                                            id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                    </div>
                                    <div className=" lg:col-span-1">
                                        <div className='grid grid-cols-1 gap-4'>
                                            <div className='col-span-1 border border-gray-400 w-32 h-28 rounded-lg pt-1'>
                                                <ImageDropzone onImageDrop={handleImageDrop} />
                                            </div>
                                            <div className="col-span-1 pl-9">
                                                <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Send</Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>

                )}
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
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[1.5rem]`}>We have received your report. Thank you very much.</p>
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
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[1.5rem]`}>An error occurred while submitting the form. Try again later.</p>
                        </div>

                    </div>
                )}
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