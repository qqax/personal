import ContactForm from "@/app/components/forms/contactForm";

const contacts = {mail: ["alar0@yahoo.com"], tel: ["+996 (700) 386-364"]};

export default function ContactsPage() {
    return (
            <>
                <h2 className={"text-2xl text-beige text-center mb-6"}>Contacts</h2>
                <div className={"flex flex-col md:flex-row lg:flex-col gap-10 w-full"}>
                    <div className={"flex flex-col gap-4 w-60"}>
                        {contacts.mail.map((item) => <a key={item}
                                                        className={"hover:text-beige transition duration-200"}
                                                        href={`mailto: ${item}`}>{item}</a>)}
                        {contacts.tel.map((item) => <a key={item}
                                                       className={"hover:text-beige transition duration-200"}
                                                       href={`tel: ${item}`}>{item}</a>)}
                    </div>
                    <ContactForm/>
                </div>
            </>
    );
}
