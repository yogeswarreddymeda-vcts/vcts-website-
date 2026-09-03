import { useEffect, useRef } from 'react'
import hardwareImage from '../../assets/image/Hackathon/ChatGPT Image Sep 3, 2026, 02_13_45 PM (1).png'
import softwareImage from '../../assets/image/Hackathon/ChatGPT Image Sep 3, 2026, 02_13_45 PM (2).png'
import productImage from '../../assets/image/Hackathon/ChatGPT Image Sep 3, 2026, 02_13_46 PM (3).png'
import managementImage from '../../assets/image/Hackathon/ChatGPT Image Sep 3, 2026, 02_13_46 PM (4).png'
import './EngineeringTeam.css'

/** Displays the five disciplines that form each cross-functional team. */
export default function EngineeringTeam() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    if (!('IntersectionObserver' in window)) {
      section.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('is-visible', entry.isIntersecting)
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="engineering-team" className="engineering-team" aria-label="Cross-functional team">
      <div className="engineering-team__viewport">
        <div className="engineering-team__canvas">
          <div className="engineering-team__intro">
            <h2 id="engineering-team-title">Cross-functional team</h2>
            <span aria-hidden="true" />
            <p>
              Every selected project will have<br />
              a balanced team with complementary skills.
            </p>
          </div>

          <svg
            className="engineering-team__artwork"
            viewBox="0 0 1672 942"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="engineering-team-letter-t" clipPathUnits="userSpaceOnUse">
                <path d="M61 234 H414 V356 H321 V684 H190 V356 H61 Z" />
              </clipPath>
              <clipPath id="engineering-team-letter-e" clipPathUnits="userSpaceOnUse">
                <path d="M430 234 H784 V341 H580 V407 H760 V503 H580 V577 H778 V684 H430 Z" />
              </clipPath>
              <clipPath id="engineering-team-letter-a" clipPathUnits="userSpaceOnUse">
                <path fillRule="evenodd" d="M902 234 H1040 L1150 684 H1028 L1008 603 H916 L899 684 H779 Z M961 371 L938 505 H990 Z" />
              </clipPath>
              <clipPath id="engineering-team-letter-m" clipPathUnits="userSpaceOnUse">
                <path d="M1161 234 H1286 L1343 438 L1397 234 H1519 V684 H1429 V412 L1391 684 H1295 L1254 412 V684 H1161 Z" />
              </clipPath>
            </defs>

            <image className="engineering-team__letter" style={{ '--team-order': 0 }} href={hardwareImage} x="-142" y="234" width="799" height="450" preserveAspectRatio="none" clipPath="url(#engineering-team-letter-t)" />
            <image className="engineering-team__letter" style={{ '--team-order': 1 }} href={softwareImage} x="217" y="234" width="799" height="450" preserveAspectRatio="none" clipPath="url(#engineering-team-letter-e)" />
            <image className="engineering-team__letter" style={{ '--team-order': 2 }} href={productImage} x="536" y="234" width="799" height="450" preserveAspectRatio="none" clipPath="url(#engineering-team-letter-a)" />
            <image className="engineering-team__letter" style={{ '--team-order': 3 }} href={managementImage} x="940" y="234" width="799" height="450" preserveAspectRatio="none" clipPath="url(#engineering-team-letter-m)" />

            <g className="engineering-team__connectors">
              <path d="M321 683 L392 769 H486" />
              <path d="M739 683 L689 769 H627" />
              <path d="M1008 663 L947 769 H878" />
              <path d="M1240 683 L1194 769 H1132" />
              <path d="M1493 683 L1445 769 H1373" />
              <circle cx="321" cy="683" r="3.5" />
              <circle cx="739" cy="683" r="3.5" />
              <circle cx="1008" cy="663" r="3.5" />
              <circle cx="1240" cy="683" r="3.5" />
              <circle cx="1493" cy="683" r="3.5" />
            </g>
          </svg>

          <div className="engineering-team__count">
            <strong>5–8</strong>
            <span>members</span>
          </div>

          <div className="engineering-team__role engineering-team__role--hardware">
            <strong>Hardware</strong>
            <span>Engineer</span>
          </div>
          <div className="engineering-team__role engineering-team__role--software">
            <strong>Software</strong>
            <span>Engineer</span>
          </div>
          <div className="engineering-team__role engineering-team__role--product">
            <strong>Product</strong>
            <span>Management</span>
          </div>
          <div className="engineering-team__role engineering-team__role--project">
            <strong>Project</strong>
            <span>Management</span>
          </div>
          <div className="engineering-team__role engineering-team__role--sales">
            <strong>Sales /</strong>
            <span>Business</span>
          </div>

          <aside className="engineering-team__statement">
            <span aria-hidden="true" />
            <p>We help form strong, balanced teams based on project needs.</p>
            <span aria-hidden="true" />
          </aside>
        </div>
      </div>

      <div className="engineering-team__mobile">
        <div className="engineering-team__mobile-intro">
          <h2>Cross-functional<br />team</h2>
          <span aria-hidden="true" />
          <p>
            Every selected project will have<br />
            a balanced team with complementary skills.
          </p>
        </div>

        <svg
          className="engineering-team__mobile-artwork"
          viewBox="0 0 943 1900"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="engineering-team-mobile-t" clipPathUnits="userSpaceOnUse">
              <path d="M153 303 H438 V386 H349 V541 H253 V386 H153 Z" />
            </clipPath>
            <clipPath id="engineering-team-mobile-e" clipPathUnits="userSpaceOnUse">
              <path d="M168 554 H415 V615 H287 V655 H399 V706 H287 V744 H418 V792 H168 Z" />
            </clipPath>
            <clipPath id="engineering-team-mobile-a" clipPathUnits="userSpaceOnUse">
              <path fillRule="evenodd" d="M245 803 H351 L432 1044 H342 L331 1002 H251 L238 1044 H147 Z M291 887 L267 961 H317 Z" />
            </clipPath>
            <clipPath id="engineering-team-mobile-m" clipPathUnits="userSpaceOnUse">
              <path d="M133 1053 H254 L298 1165 L340 1053 H465 V1282 H375 V1160 L335 1282 H260 L220 1160 V1282 H133 Z" />
            </clipPath>
          </defs>

          <g transform="translate(0 130)">
            <image className="engineering-team__letter" style={{ '--team-order': 0 }} href={hardwareImage} x="123" y="303" width="345" height="238" preserveAspectRatio="xMidYMid slice" clipPath="url(#engineering-team-mobile-t)" />
            <image className="engineering-team__letter" style={{ '--team-order': 1 }} href={softwareImage} x="140" y="554" width="310" height="238" preserveAspectRatio="xMidYMid slice" clipPath="url(#engineering-team-mobile-e)" />
            <image className="engineering-team__letter" style={{ '--team-order': 2 }} href={productImage} x="147" y="803" width="285" height="241" preserveAspectRatio="xMidYMid slice" clipPath="url(#engineering-team-mobile-a)" />
            <image className="engineering-team__letter" style={{ '--team-order': 3 }} href={managementImage} x="116" y="1053" width="365" height="229" preserveAspectRatio="xMidYMid slice" clipPath="url(#engineering-team-mobile-m)" />

            <g className="engineering-team__mobile-connectors">
              <path d="M438 386 L472 419 H580" />
              <path d="M415 610 L472 666 H580" />
              <path d="M378 892 L432 927 H580" />
              <path d="M249 1282 L214 1310 H153 V1326" />
              <path d="M346 1282 L372 1310 H440 V1326" />
              <circle cx="580" cy="419" r="4" />
              <circle cx="580" cy="666" r="4" />
              <circle cx="580" cy="927" r="4" />
              <circle cx="153" cy="1326" r="4" />
              <circle cx="440" cy="1326" r="4" />
            </g>
          </g>
        </svg>

        <div className="engineering-team__mobile-role engineering-team__mobile-role--hardware">
          <strong>Hardware</strong>
          <span>Engineer</span>
        </div>
        <div className="engineering-team__mobile-role engineering-team__mobile-role--software">
          <strong>Software</strong>
          <span>Engineer</span>
        </div>
        <div className="engineering-team__mobile-role engineering-team__mobile-role--product">
          <strong>Product</strong>
          <span>Management</span>
        </div>
        <div className="engineering-team__mobile-role engineering-team__mobile-role--project">
          <strong>Project</strong>
          <span>Management</span>
        </div>
        <div className="engineering-team__mobile-role engineering-team__mobile-role--sales">
          <strong>Sales /</strong>
          <span>Business</span>
        </div>

        <div className="engineering-team__mobile-count">
          <strong>5–8</strong>
          <span>members</span>
        </div>

        <p className="engineering-team__mobile-statement">
          We help form strong, balanced teams based on project needs.
        </p>
      </div>
    </section>
  )
}
