import ContactForm from "@/app/components/forms/contactForm";
import { fetchContacts } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";
import mailIcon from "@/public/icons/mail.svg";
import phoneIcon from "@/public/icons/phone.svg";
import { CONTACT_TYPE_EMAIL, CONTACT_TYPE_PHONE } from "@/app/lib/schema/enums";
import { getTranslations } from "next-intl/server";
import BottomMenu from "@/app/components/navbar/bottomMenuLink";
import React from "react";

import { MenuTitle } from "@/app/components/navbar/menuTypes";
import Social from "@/app/components/social";
import { homePageStyle } from "@/app/ui/styles";
import clsx from "clsx";

export default async function ContactsPage() {
    const contacts = await fetchContacts();
    const t = await getTranslations("Titles");
    const title = t("contacts");
    const bottomMenuTitles: MenuTitle[] = ["biography", "concerts", "records"] as const;

    return (
        <div className={clsx(homePageStyle, "flex flex-col gap-10")}>
            <h2 className={"text-xl sm:text-2xl text-beige text-center"}>{title}</h2>
            <div className={"flex flex-col gap-10 w-full"}>
                <div className={"flex flex-col gap-4 w-60"}>
                    {contacts[CONTACT_TYPE_EMAIL].map((item) => <Link key={item}
                                                                      className={"flex gap-2 hover:text-beige transition duration-200"}
                                                                      href={`mailto: ${item}`}>
                        <Image
                            src={mailIcon}
                            alt={item}
                            width={20}
                            height={24}
                        />
                        {item}
                    </Link>)}
                    {contacts[CONTACT_TYPE_PHONE].map((item) => <Link key={item}
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
            <div className={"flex lg:hidden justify-center items-center gap-6"}>
                <Social/>
            </div>
            <BottomMenu titles={bottomMenuTitles}/>
        </div>
    );
}
