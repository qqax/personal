const contacts = {mail: ["alar0@yahoo.com"], tel: ["+996 (700) 386-364"]}

export default function ContactsPage() {
    return (
        <section
            className="w-full flex flex-row m-10 justify-center">
            <div className="p-16 flex flex-col gap-4 text-lg leading-tight bg-black bg-opacity-50 border-[1px] border-amber-300 backdrop-blur-sm">
                <h2 className={"text-2xl"}>Contacts</h2>
                {contacts.mail.map((item) => <a key={item} className={"hover:text-amber-300 transition duration-200"} href={`mailto: ${item}`}>{item}</a>)}
                {contacts.tel.map((item) => <a key={item} className={"hover:text-amber-300 transition duration-200"} href={`tel: ${item}`}>{item}</a>)}
            </div>
        </section>
    );
}
