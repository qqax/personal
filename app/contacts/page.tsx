import clsx from "clsx";
import {bgStyle} from "@/app/ui/styles";
import Social from "@/app/contacts/Social";

const contacts = {mail: ["alar0@yahoo.com"], tel: ["+996 (700) 386-364"]}

export default function ContactsPage() {
    return (
        <section
            className="w-full flex flex-row justify-center">

            <div
                className={clsx("p-14 text-lg leading-tight border-[1px] border-amber-300", bgStyle)}>
                <h2 className={"text-2xl text-beige text-center mb-10"}>Contacts</h2>
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
                    <form className={"flex flex-col gap-4"}>
                        <label htmlFor="Your_email">Email:</label>
                        <input type="email"/>

                        <label htmlFor="Message_for_Alexaner">Your message:</label>
                        <textarea id="Message_for_Alexaner" name="Message_for_Alexaner" rows={4} cols={50}/>

                        <button type={"submit"} className={"bg-amber-300 text-black py-1"}>Send message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
