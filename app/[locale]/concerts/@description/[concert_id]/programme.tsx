import {MDXRemote} from "next-mdx-remote/rsc";

export const Programme = ({programme}: {programme: string}) => {
  return <>
      <div className={"text-center text-2xl text-beige"}>Programme</div>
      <MDXRemote source={programme}/>
  </>
}