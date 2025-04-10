import ContactForm from "@/app/components/forms/contactForm";
import {fetchContacts} from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";
import mailIcon from "@/public/icons/mail.svg";
import phoneIcon from "@/public/icons/phone.svg";

export default async function ContactsPage() {
    const contacts = await fetchContacts();

    return (
        <>
            <h2 className={"text-xl sm:text-2xl text-beige text-center mb-1.5 nb:mb-4 sm:mb-6"}>Contacts</h2>
            <div className={"flex flex-col gap-10 w-full"}>
                <div className={"flex flex-col gap-4 w-60"}>
                    {contacts.mail.map((item) => <Link key={item} className={"flex gap-2 hover:text-beige transition duration-200"}
                                                       href={`mailto: ${item}`}>
                        <Image
                            src={mailIcon}
                            alt={item}
                            width={20}
                            height={24}
                        />
                        {item}
                    </Link>)}
                    {contacts.phone.map((item) => <Link key={item}
                                                        className={"flex gap-2 hover:text-beige transition duration-200"}
                                                        href={`tel: ${item}`}>
                        <Image
                            src={phoneIcon}
                            alt={item}
                            width={20}
                            height={24}
                        />
                        {item}
                    </Link>)}
                </div>
                <ContactForm/>
            </div>
        </>
    );
}
