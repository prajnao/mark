'use client';
import { HugeiconsIcon } from '@hugeicons/react'
import { Download03Icon, PuzzleIcon, Settings01Icon, ToggleOnIcon, InternetIcon } from '@hugeicons/core-free-icons'

// import { useState } from "react";

// const browsers = [
//   {
//     id: "chrome",
//     label: "Chrome",
//     icon: ChromeIcon,
//   },
//   {
//     id: "edge",
//     label: "Edge",
//     icon: EdgeIcon,
//   },
//   {
//     id: "firefox",
//     label: "Firefox",
//     icon: FirefoxIcon,
//   },
//   {
//     id: "dia",
//     label: "Dia",
//     icon: DiaIcon,
//   },
// ] as const;

export default function HowToUse(){
    // const [activeBrowser,setActiveBrowser]=useState("chrome");
    
    return(
        <section className="">
      <h4 className="text-strong font-[450] mb-4">How to use</h4>

      {/* <div className="bg-[#f7f7f7] m-3 p-1 flex items-center mx-20 justify-between rounded-lg">
       {browsers.map((browser)=>(
         <div
         onClick={()=>setActiveBrowser(browser.id)}
         className={` ${activeBrowser===browser.id ? "text-strong bg-white" :"text-muted"} rounded-lg flex items-center gap-2 px-3 py-1.5 hover:text-strong text-sm`}>
      <browser.icon className="size-4 shrink-0" />
         
          {browser.id.charAt(0).toUpperCase()}{browser.id.slice(1,)}
        </div>

       ))}
      </div> */}

   <div className='grid grid-cols-1 gap-4'>
       {howToUseSteps.map((how)=>{
        console.log(how,"How")
       return <div key={how.id} className='flex items-center gap-2 text-sm'> 
            {/* no  */}
           {/* <span className='text-muted'>   {how.id}.</span> */}
            {/* <div className='bg-elevated size-5.5 rounded-[6px] flex justify-center items-center'>
              {how.Icon}
            </div> */}
                <span className="shrink-0 text-muted">
              {how.Icon}
            </span>

            {how.link ? 
            <a href={how.link} target='_blank' className='cursor-pointer flex items-center  underline underline-offset-4 text-muted hover:text-strong transition-colors decoration-muted/40'>
              {how.text}

              {how.highlightTexts &&
              <span className='flex items-center gap-x-1.5 ml-1 text-sm'>
               {how?.highlightTexts?.map((highlight:string)=> (
           <span className='bg-elevated rounded px-0 text-sm'>   {highlight},</span>

       
       ))}
       </span>
       }
            </a>  
            :   <p className='flex items-center text-sm'> <span>
              {how.text}
            </span>
                  
            {how.highlightTexts &&
              <span className='flex items-center gap-x-1.5 ml-1 text-sm'>
               {how?.highlightTexts?.map((highlight,index)=> (
           <span className='bg-elevated rounded px-1.5 text-sm'>   {highlight}{index!==how.highlightTexts.length-1 && ","}</span>

       
       ))}
       </span>
       }
            </p>
          }

          </div>
})}
   </div>

    </section>
    )
}



const howToUseSteps=[
  {
    id:1,
    Icon:<HugeiconsIcon icon={Download03Icon} size={15} />,
    text:"Install Mark Extension",
    link:"https://chromewebstore.google.com/detail/mlakoabceocimmnfohpmpjojmgdgijbp"
  },
   {
    id:2,
    Icon:<HugeiconsIcon icon={PuzzleIcon} size={15} />,
    text:"Open extensions, pin mark to the toolbar",
  },
   {
    id:3,
    Icon:<HugeiconsIcon icon={Settings01Icon} size={15} />,
    text:"Right click on the extension and manage extension",
    // link:"chrome://extensions/?id=mlakoabceocimmnfohpmpjojmgdgijbp"
  },
    {
    id:4,
    Icon:<HugeiconsIcon icon={ToggleOnIcon} size={15} />,
    text:"Toggle",
    highlightTexts:["Automatically allow access on the following sites","Allow access to file URLs"],
    link:""
  },
  {
    id:4,
    Icon:<HugeiconsIcon icon={InternetIcon} size={15} />,
    text:"Set your choice of browser as default for markdown files, double click & Magic!",
    link:""
  },
  
  
]



import { useId, type SVGProps } from "react";

type BrowserIconProps = SVGProps<SVGSVGElement>;

/* -------------------------------------------------------------------------- */
/*                                   Chrome                                   */
/* -------------------------------------------------------------------------- */

export function ChromeIcon({
  className,
  ...props
}: BrowserIconProps) {
  return (
    <svg
      viewBox="0 0 190.5 190.5"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="#fff"
        d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
      />

      <path
        fill="#229342"
        d="m54.005 119.07-41.24-71.43a95.227 95.227 0 0 0-.003 95.25 95.234 95.234 0 0 0 82.496 47.61l41.24-71.43v-.011a47.613 47.613 0 0 1-17.428 17.443 47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
      />

      <path
        fill="#fbc116"
        d="m136.495 119.067-41.239 71.43a95.229 95.229 0 0 0 82.489-47.622A95.24 95.24 0 0 0 190.5 95.248a95.237 95.237 0 0 0-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0 1 23.819 6.372 47.618 47.618 0 0 1 17.439 17.431 47.62 47.62 0 0 1-.001 47.633z"
      />

      <path
        fill="#1a73e8"
        d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
      />

      <path
        fill="#e33b2e"
        d="M95.252 47.628h82.479A95.237 95.237 0 0 0 142.87 12.76 95.23 95.23 0 0 0 95.245 0a95.222 95.222 0 0 0-47.623 12.767 95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633 47.61 47.61 0 0 1 41.252-23.815z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Edge                                    */
/* -------------------------------------------------------------------------- */

export function EdgeIcon({
  className,
  ...props
}: BrowserIconProps) {
  const id = useId().replaceAll(":", "");

  const a = `${id}-edge-a`;
  const b = `${id}-edge-b`;
  const c = `${id}-edge-c`;
  const d = `${id}-edge-d`;
  const e = `${id}-edge-e`;
  const f = `${id}-edge-f`;

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient
          id={a}
          x1="63.3"
          x2="241.7"
          y1="84"
          y2="84"
          gradientTransform="matrix(1 0 0 -1 0 266)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0c59a4" />
          <stop offset="1" stopColor="#114a8b" />
        </linearGradient>

        <radialGradient
          id={b}
          cx="161.8"
          cy="68.9"
          r="95.4"
          gradientTransform="matrix(1 0 0 -.95 0 248.8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".7" stopOpacity="0" />
          <stop offset=".9" stopOpacity=".5" />
          <stop offset="1" />
        </radialGradient>

        <linearGradient
          id={c}
          x1="157.3"
          x2="46"
          y1="161.4"
          y2="40.1"
          gradientTransform="matrix(1 0 0 -1 0 266)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1b9de2" />
          <stop offset=".2" stopColor="#1595df" />
          <stop offset=".7" stopColor="#0680d7" />
          <stop offset="1" stopColor="#0078d4" />
        </linearGradient>

        <radialGradient
          id={d}
          cx="-340.3"
          cy="63"
          r="143.2"
          gradientTransform="matrix(.15 -.99 -.8 -.12 176.6 -125.4)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".8" stopOpacity="0" />
          <stop offset=".9" stopOpacity=".5" />
          <stop offset="1" />
        </radialGradient>

        <radialGradient
          id={e}
          cx="113.4"
          cy="570.2"
          r="202.4"
          gradientTransform="matrix(-.04 1 2.13 .08 -1179.5 -106.7)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#35c1f1" />
          <stop offset=".1" stopColor="#34c1ed" />
          <stop offset=".2" stopColor="#2fc2df" />
          <stop offset=".3" stopColor="#2bc3d2" />
          <stop offset=".7" stopColor="#36c752" />
        </radialGradient>

        <radialGradient
          id={f}
          cx="376.5"
          cy="568"
          r="97.3"
          gradientTransform="matrix(.28 .96 .78 -.23 -303.8 -148.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#66eb6e" />
          <stop offset="1" stopColor="#66eb6e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        fill={`url(#${a})`}
        d="M235.7 195.5a93.7 93.7 0 0 1-10.6 4.7 101.9 101.9 0 0 1-35.9 6.4c-47.3 0-88.5-32.5-88.5-74.3a31.5 31.5 0 0 1 16.4-27.3c-42.8 1.8-53.8 46.4-53.8 72.5 0 74 68.1 81.4 82.8 81.4 7.9 0 19.8-2.3 27-4.6l1.3-.4a128.3 128.3 0 0 0 66.6-52.8 4 4 0 0 0-5.3-5.6Z"
        transform="translate(-4.6 -5)"
      />

      <path
        fill={`url(#${b})`}
        d="M235.7 195.5a93.7 93.7 0 0 1-10.6 4.7 101.9 101.9 0 0 1-35.9 6.4c-47.3 0-88.5-32.5-88.5-74.3a31.5 31.5 0 0 1 16.4-27.3c-42.8 1.8-53.8 46.4-53.8 72.5 0 74 68.1 81.4 82.8 81.4 7.9 0 19.8-2.3 27-4.6l1.3-.4a128.3 128.3 0 0 0 66.6-52.8 4 4 0 0 0-5.3-5.6Z"
        opacity=".35"
        transform="translate(-4.6 -5)"
      />

      <path
        fill={`url(#${c})`}
        d="M110.3 246.3A79.2 79.2 0 0 1 87.6 225a80.7 80.7 0 0 1 29.5-120c3.2-1.5 8.5-4.1 15.6-4a32.4 32.4 0 0 1 25.7 13 31.9 31.9 0 0 1 6.3 18.7c0-.2 24.5-79.6-80-79.6-43.9 0-80 41.6-80 78.2a130.2 130.2 0 0 0 12.1 56 128 128 0 0 0 156.4 67 75.5 75.5 0 0 1-62.8-8Z"
        transform="translate(-4.6 -5)"
      />

      <path
        fill={`url(#${d})`}
        d="M110.3 246.3A79.2 79.2 0 0 1 87.6 225a80.7 80.7 0 0 1 29.5-120c3.2-1.5 8.5-4.1 15.6-4a32.4 32.4 0 0 1 25.7 13 31.9 31.9 0 0 1 6.3 18.7c0-.2 24.5-79.6-80-79.6-43.9 0-80 41.6-80 78.2a130.2 130.2 0 0 0 12.1 56 128 128 0 0 0 156.4 67 75.5 75.5 0 0 1-62.8-8Z"
        opacity=".41"
        transform="translate(-4.6 -5)"
      />

      <path
        fill={`url(#${e})`}
        d="M157 153.8c-.9 1-3.4 2.5-3.4 5.6 0 2.6 1.7 5.2 4.8 7.3 14.3 10 41.4 8.6 41.5 8.6a59.6 59.6 0 0 0 30.3-8.3 61.4 61.4 0 0 0 30.4-52.9c.3-22.4-8-37.3-11.3-43.9C228 28.8 182.3 5 132.6 5a128 128 0 0 0-128 126.2c.5-36.5 36.8-66 80-66 3.5 0 23.5.3 42 10a72.6 72.6 0 0 1 30.9 29.3c6.1 10.6 7.2 24.1 7.2 29.5s-2.7 13.3-7.8 19.9Z"
        transform="translate(-4.6 -5)"
      />

      <path
        fill={`url(#${f})`}
        d="M157 153.8c-.9 1-3.4 2.5-3.4 5.6 0 2.6 1.7 5.2 4.8 7.3 14.3 10 41.4 8.6 41.5 8.6a59.6 59.6 0 0 0 30.3-8.3 61.4 61.4 0 0 0 30.4-52.9c.3-22.4-8-37.3-11.3-43.9C228 28.8 182.3 5 132.6 5a128 128 0 0 0-128 126.2c.5-36.5 36.8-66 80-66 3.5 0 23.5.3 42 10a72.6 72.6 0 0 1 30.9 29.3c6.1 10.6 7.2 24.1 7.2 29.5s-2.7 13.3-7.8 19.9Z"
        transform="translate(-4.6 -5)"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Firefox                                  */
/* -------------------------------------------------------------------------- */

export function FirefoxIcon({
  className,
  ...props
}: BrowserIconProps) {
  const id = useId().replaceAll(":", "");

  const orange = `${id}-firefox-orange`;
  const purple = `${id}-firefox-purple`;
  const blue = `${id}-firefox-blue`;

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <radialGradient id={purple} cx="45%" cy="65%" r="64%">
          <stop offset="0" stopColor="#3A8EE6" />
          <stop offset=".45" stopColor="#9059FF" />
          <stop offset=".8" stopColor="#C139E6" />
          <stop offset="1" stopColor="#8B0DA8" />
        </radialGradient>

        <linearGradient
          id={orange}
          x1="50"
          y1="20"
          x2="190"
          y2="230"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFF44F" />
          <stop offset=".25" stopColor="#FF980E" />
          <stop offset=".55" stopColor="#FF5634" />
          <stop offset=".75" stopColor="#FF3647" />
          <stop offset="1" stopColor="#E31587" />
        </linearGradient>

        <radialGradient id={blue} cx="54%" cy="45%" r="60%">
          <stop offset="0" stopColor="#54C8FF" />
          <stop offset=".55" stopColor="#3A8EE6" />
          <stop offset="1" stopColor="#5B29D6" />
        </radialGradient>
      </defs>

      {/* inner globe */}
      <circle
        cx="132"
        cy="137"
        r="77"
        fill={`url(#${purple})`}
      />

      <path
        fill={`url(#${blue})`}
        d="
          M174 83
          C145 64 108 67 84 88
          C65 105 55 130 59 153
          C63 181 84 205 112 215
          C84 211 58 198 40 177
          C18 151 13 117 24 87
          C32 64 49 44 70 32
          C63 48 62 65 68 80
          C91 60 123 52 153 59
          C161 61 168 64 174 67
          C173 73 173 78 174 83
          Z
        "
      />

      {/* Firefox tail/body */}
      <path
        fill={`url(#${orange})`}
        d="
          M242 78
          C235 57 221 40 203 29
          C210 43 214 58 213 73
          C200 55 181 41 158 34
          C137 27 113 28 93 37
          C69 47 49 65 38 87
          C32 99 28 112 27 125
          C19 111 16 95 19 78
          C3 96 -3 121 2 146
          C10 190 47 227 91 239
          C132 251 178 238 207 207
          C235 177 247 128 232 91
          C229 84 226 78 222 72
          C229 73 236 75 242 78
          Z

          M191 105
          C199 123 198 145 189 162
          C178 185 154 200 128 200
          C93 200 65 173 65 139
          C65 123 71 109 81 98
          C91 87 105 80 120 78
          C107 88 100 102 102 116
          C104 132 115 145 130 150
          C146 156 163 151 174 139
          C184 128 189 116 191 105
          Z
        "
      />

      {/* flame/highlight */}
      <path
        fill="#FFCA28"
        d="
          M40 91
          C49 70 64 51 84 38
          C80 50 82 62 89 71
          C75 78 64 89 56 103
          C50 114 47 127 47 140
          C39 124 36 107 40 91
          Z
        "
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Dia                                     */
/* -------------------------------------------------------------------------- */

export function DiaIcon({
  className,
  ...props
}: BrowserIconProps) {
  const id = useId().replaceAll(":", "");
  const gradient = `${id}-dia-gradient`;
  const background = `${id}-dia-background`;

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient
          id={background}
          x1="128"
          y1="14"
          x2="128"
          y2="242"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1F2FA" />
        </linearGradient>

        <linearGradient
          id={gradient}
          x1="128"
          y1="50"
          x2="128"
          y2="197"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#234FC7" />
          <stop offset=".2" stopColor="#4675E0" />
          <stop offset=".4" stopColor="#76A0DF" />
          <stop offset=".56" stopColor="#D9D9C9" />
          <stop offset=".7" stopColor="#FFD45A" />
          <stop offset=".84" stopColor="#FF8A5D" />
          <stop offset="1" stopColor="#EF5682" />
        </linearGradient>
      </defs>

      {/* rounded macOS-style tile */}
      <rect
        x="12"
        y="12"
        width="232"
        height="232"
        rx="58"
        fill={`url(#${background})`}
      />

      <rect
        x="12.5"
        y="12.5"
        width="231"
        height="231"
        rx="57.5"
        fill="none"
        stroke="#D8D9E0"
        strokeOpacity=".6"
      />

      {/* Dia's coloured dome */}
      <path
        fill={`url(#${gradient})`}
        d="
          M128 52
          C83 52 56 90 56 141
          C56 159 60 176 67 187
          C71 193 78 195 85 191
          Q128 164 171 191
          C178 195 185 193 189 187
          C196 176 200 159 200 141
          C200 90 173 52 128 52
          Z
        "
      />
    </svg>
  );
}





