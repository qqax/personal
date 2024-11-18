import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/components/social";
import ContactForm from "@/app/contacts/contactForm";

const contacts = {mail: ["alar0@yahoo.com"], tel: ["+996 (700) 386-364"]}

export default function ContactsPage() {
    return (
        <section
            className="w-full flex flex-row justify-center">

            <div
                className={clsx("p-10 text-lg leading-tight border-[1px] border-amber-300", bgStyle)}>
                <h2 className={"text-3xl text-beige text-center mb-6"}>Contacts</h2>
                <div className={"flex gap-10"}>
                    <div className={"flex flex-col gap-4"}>
                        {contacts.mail.map((item) => <a key={item}
                                                        className={"hover:text-amber-300 transition duration-200"}
                                                        href={`mailto: ${item}`}>{item}</a>)}
                        {contacts.tel.map((item) => <a key={item}
                                                       className={"hover:text-amber-300 transition duration-200"}
                                                       href={`tel: ${item}`}>{item}</a>)}
                        <Social/>
                    </div>
                    <ContactForm/>
                </div>
            </div>
        </section>
    );
}
