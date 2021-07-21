import React, { Component } from 'react';

const DashboardIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="50" height="44" viewBox="0 0 50 44" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9294 36.6591C20.1822 39.2858 17.0422 39.5176 15.5373 40.7124L15.7124 42.7372C17.6499 43.5494 31.5071 43.536 33.3857 42.7194L33.734 40.7264C32.0817 39.4813 28.9573 39.2803 29.2403 36.6591C32.4597 36.6591 35.6791 36.6591 38.8985 36.6591C41.788 36.6591 46.1424 37.3506 47.8821 35.4067C49.5839 33.5055 48.9833 29.5873 48.9833 26.7491C48.9833 23.3875 48.9833 20.026 48.9833 16.6645C48.9833 -1.92049 51.5715 1.20016 24.5848 1.20016C18.054 1.20016 11.2367 1.00833 4.74213 1.19891C-1.35949 1.3781 0.186346 8.07158 0.186346 16.339C0.186346 40.0187 -3.30426 36.6591 19.9294 36.6591ZM4.45102 3.87541C2.01137 4.55606 2.72779 7.19039 2.72779 11.4595L2.71889 30.0082C2.69469 34.6855 3.60932 34.1358 7.99269 34.1242C12.3015 34.1129 43.4808 34.3915 44.8859 34.0095C47.2086 33.3779 46.4419 28.9627 46.4419 26.4238L46.4508 7.87511C46.4746 3.22501 45.5261 3.72397 41.1769 3.73696C36.8566 3.74995 5.9036 3.47023 4.45102 3.87541Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8696 7.40495C8.43936 8.02794 5.79721 11.0167 6.39013 15.0088C7.64483 23.4567 20.8812 21.6893 19.3808 12.7864C18.8407 9.58213 15.6711 6.71434 11.8696 7.40495Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M39.5791 30.1084L40.8495 30.1613L42.8829 30.1524V8.50977L39.5791 8.52329V30.1084Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4379 16.0132L12.9419 13.9665L12.8811 8.88428C8.98635 9.24462 6.12764 13.3395 8.74809 16.8871C11.1372 20.1218 15.7919 19.644 17.4379 16.0132Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.7162 14.0616L29.7363 14.0454V29.8649H32.7167L32.7162 14.0616Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.54 30.1528L37.9029 30.1378L37.8913 17.4166L34.6701 17.3984L34.54 30.1528Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28516 26.0981H19.3788L19.5006 24.3208H6.36629L6.28516 26.0981Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28516 30.1522H19.3788L19.5006 28.375H6.36629L6.28516 30.1522Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.584 30.1524H27.8877V23.4956H24.584V30.1524Z" />
    </svg>
</div>

const ProfileIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.57324 32.6681C10.4584 34.3706 11.3926 35.5918 14.0052 37.0019C18.8979 39.6424 25.0154 39.6342 29.8941 37.0063C32.5375 35.5826 33.4111 34.3608 35.3236 32.6753C35.021 30.0349 33.0192 27.9177 31.0381 27.0392C28.7734 26.0346 15.1238 26.0325 12.8612 27.0445C10.8745 27.9332 8.8875 30.0182 8.57324 32.6681Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1953 0.36588C-1.07473 3.9072 -6.27576 27.992 8.60309 39.4044C24.4742 51.5777 47.0339 37.8593 43.5543 18.0547C43.0267 15.0517 41.98 12.5599 40.486 10.2524C35.9099 3.18529 27.5735 -1.35753 18.1953 0.36588ZM18.4512 3.36215C9.28177 5.18397 1.00422 14.1093 3.3323 25.6123C5.16141 34.6504 14.2061 42.9427 25.5917 40.595C34.6426 38.7287 42.8764 29.7935 40.5627 18.3302C38.7382 9.2901 29.7932 1.10881 18.4512 3.36215Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8026 9.89889C10.3257 12.9576 14.7172 26.7063 24.0745 24.1005C27.4755 23.1534 30.3719 19.2989 29.0825 14.8478C28.113 11.501 24.3916 8.41784 19.8026 9.89889Z" />
    </svg>
</div>

const PlanIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="44" height="45" viewBox="0 0 44 45" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.666 43.5464L32.7093 43.4103L32.8257 42.3618L32.8317 41.3525L32.8257 40.2423L32.8319 39.233L32.8262 37.9094L34.8555 37.4435C35.1146 37.2643 35.3584 37.1693 35.6892 37.1547C36.0182 36.8141 36.661 36.5552 37.0727 36.3043C39.3083 34.9419 40.154 33.0493 40.4727 32.8194C41.1603 30.9593 42.0366 30.0954 41.9531 27.1221C41.9227 26.0357 41.7721 25.0335 41.4645 24.0466C41.0055 22.575 40.5567 22.1616 40.3389 21.5837C40.6975 21.0808 41.5144 20.5859 41.668 19.8047C41.8495 18.8808 41.2475 18.097 40.5343 17.9153C39.0755 17.5441 38.2536 19.2426 36.9215 20.5066L30.8209 27.1013C30.1333 26.4306 29.4137 25.7782 28.7357 25.0691C28.3788 24.6956 28.0759 24.3194 27.2906 24.3696C25.9243 24.4566 25.5142 25.8987 26.0091 26.7867C26.197 27.1237 28.9402 29.7803 29.1601 29.9941C29.7184 30.5371 30.6698 31.6252 31.8882 30.718L38.008 24.1315C38.5025 24.7835 38.7394 26.5471 38.7246 27.5266C38.6769 30.6679 36.5179 33.5844 33.2707 34.5183C28.3631 35.9297 24.0643 32.2605 23.7221 27.9348C23.3464 23.1886 27.334 19.2358 32.1454 19.8204C32.7328 19.8917 34.4948 20.5183 35.0014 18.9903C35.4563 17.6187 34.4384 16.9594 33.2339 16.7314C32.0071 16.4992 30.6964 16.468 29.4607 16.6773C28.7583 16.7962 26.6634 17.3284 26.3808 17.7336L25.816 18.013C25.2149 18.2922 24.134 19.144 23.7627 19.5592C23.4028 19.9615 23.2244 20.0706 22.8952 20.5071C22.6341 20.8532 22.2768 21.2262 22.1149 21.6018C21.8997 21.9328 21.8905 21.9195 21.7526 22.2771C20.9954 22.9083 20.4667 26.1387 20.4633 27.4287C20.4585 29.3421 21.0356 31.1791 21.8572 32.5566C22.7749 34.0953 23.6192 35.0341 24.9469 36.0257C26.1945 36.9576 27.7702 37.5951 29.5961 37.9323L29.6009 41.0706L4.25577 41.0793L4.26253 6.20248L8.01116 6.21083C8.01116 7.73797 7.98892 9.15247 9.63546 9.17542C10.3592 9.18556 10.8112 8.76455 11.0407 8.33961C11.3445 7.77712 11.2322 6.92013 11.2414 6.20941L15.3166 6.20673C15.3235 6.96016 15.0066 9.16956 16.8964 9.17063C18.5408 9.17169 18.5474 7.70043 18.5465 6.24945L22.6186 6.20941C22.6181 7.28919 22.4542 8.03923 23.1155 8.71418C23.8249 9.26048 24.5472 9.42437 25.2871 8.77077C26.0192 8.12411 25.8413 7.34685 25.8413 6.20248L26.3808 6.2055L27.3897 6.21261L28.4994 6.2055L29.5084 6.21261C29.9837 6.7468 29.0996 12.9997 29.9636 14.0513C30.4399 14.6313 31.3252 14.8135 32.0359 14.4113C33.2148 13.7444 32.8016 11.3305 32.8225 9.66175C32.8314 8.93608 32.9209 4.50504 32.7431 4.21107C32.4954 3.30425 32.3214 3.45942 31.627 3.01598L25.8717 2.97665C25.7921 2.28978 26.1963 0.0149026 24.2582 0.0138349C23.5504 0.013479 23.0493 0.399973 22.813 0.847509C22.5024 1.4358 22.648 2.26379 22.6003 2.95227L18.5638 2.97736C18.463 1.452 18.6027 0.00511137 16.9028 0.0184574C16.1398 0.0243296 15.7328 0.414743 15.5015 0.901249C15.1954 1.54417 15.3798 2.23319 15.2929 2.9827L11.261 2.97808C11.2076 2.42964 11.6092 0.0108025 9.63385 0.00635387C7.68213 0.0019052 8.0382 2.38586 7.99086 2.97166C1.41608 3.09462 1.07959 2.17696 1.0367 6.02826C0.925664 16.0198 1.10948 26.2445 1.03154 36.3066C1.01891 37.9436 1.01536 39.6157 1.03564 41.2519C1.05895 43.1225 0.858939 44.3121 3.07473 44.31C11.3774 44.302 20.0473 44.3936 28.2982 44.3078C29.1395 44.2991 29.9801 44.3135 30.8222 44.3066C31.7366 44.2991 31.935 44.2457 32.487 43.7144L32.666 43.5464Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95121 33.6592C7.20341 34.203 7.40716 36.7439 9.62989 36.7992C10.6241 36.824 15.0398 36.8953 15.6872 36.7046C17.2291 36.2504 17.3401 33.6108 14.9868 33.5625C14.0063 33.5423 9.55765 33.4706 8.95121 33.6592Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.85555 22.2175C8.29223 22.8122 8.207 23.1731 9.43163 23.2916C10.7346 23.3836 12.3186 23.2834 13.6694 23.3008C14.2467 23.3085 15.2975 23.3676 15.7834 23.1813C16.4532 22.9245 16.3982 22.5723 16.8305 22.0899L16.8271 21.2699L16.5769 20.9651C16.1988 20.1955 15.7608 20.0983 14.6778 20.0734L13.6689 20.0672L12.5592 20.0734C10.3621 20.0519 7.46175 19.4807 7.85555 22.2175Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7309 16.4884C16.2374 16.1236 16.8363 15.9652 16.79 14.8082C16.5306 12.9221 14.6244 13.3538 12.8619 13.3318C11.436 13.3138 8.89722 12.9906 8.16088 13.9425C7.73558 14.4925 7.70729 15.3844 8.12369 15.9161C8.63226 16.5656 9.31469 16.5471 10.2388 16.553C11.8104 16.5631 14.2543 16.6909 15.7309 16.4884Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25916 27.2836L8.1056 27.4644C7.65628 28.1648 7.73938 29.1462 8.33034 29.6374C9.10957 30.2853 12.8011 30.0537 13.9723 30.052C15.0432 30.0504 15.8858 30.1472 16.4255 29.4747C16.9487 28.8225 16.8963 27.818 16.3305 27.2869C15.7491 26.7411 14.7599 26.8334 13.7705 26.8226C12.3338 26.8069 9.03893 26.49 8.25916 27.2836Z" />
    </svg>

</div>

const SupportIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="49" height="50" viewBox="0 0 49 50" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9689 15.6796C11.0249 16.1792 10.5296 16.7786 10.5031 17.9947C10.473 19.3716 10.7687 19.9586 11.1852 21.0989C11.6623 22.4056 12.1965 23.8462 13.6627 24.3332C14.5049 24.613 14.7669 24.2944 15.3871 24.3413C16.1451 25.675 16.5086 26.7914 17.5243 28.3105C18.4622 29.7132 19.2299 30.6288 20.3748 31.6264C22.7185 33.6682 26.3292 34.4229 29.6551 32.6678C32.1116 31.3714 33.8809 28.714 35.3091 25.9851C35.6635 25.3083 35.9966 24.6346 36.3988 24.0187C36.8707 23.2961 37.1248 23.3164 37.5818 22.0909C37.9716 21.0458 38.4373 18.7154 37.1633 17.9498C36.8929 17.7873 36.8048 17.8651 36.5087 17.8035L36.7975 14.8871C36.9673 12.0026 36.762 9.19366 34.9525 7.02013C34.0102 5.88833 32.892 4.94158 31.2509 4.20823C26.2561 1.97639 19.7424 3.06943 16.6191 6.95035C14.8132 9.19456 14.5477 11.8551 14.7049 14.8271C14.7578 15.8265 14.9961 16.9245 15.0121 17.8447C14.8826 17.7521 14.9847 17.8635 14.8725 17.7048C14.8707 17.7021 14.7998 17.5626 14.7935 17.5481C14.5832 17.0565 14.325 16.1473 14.0483 15.7596C13.8745 15.5158 13.5836 15.4974 13.503 15.2861C13.503 13.1548 13.3357 10.5697 14.0679 8.72185C15.3491 5.48825 18.443 3.02931 21.8197 2.05439C25.7117 0.930642 30.0927 1.56633 33.3702 3.75999C34.8259 4.73432 35.8765 5.93098 36.8293 7.50581C38.3677 10.0487 37.9071 12.0349 38.0432 15.2885C38.0674 15.8649 38.0052 16.4815 38.4138 16.7032C38.9333 16.985 39.4228 16.6403 39.4953 16.1539C39.6039 15.4253 39.5214 11.6674 39.5138 10.7898C39.5019 9.40167 39.4895 9.23705 38.9051 7.84981C38.5377 6.97733 38.1207 6.25247 37.6224 5.56072C37.0538 4.77189 36.9602 4.70897 36.3679 4.1052C33.8837 1.57289 29.8731 -0.157614 25.1282 0.022072C21.6418 0.15419 17.8963 1.42467 15.4398 3.81084C14.6667 4.56149 13.9905 5.34002 13.4177 6.28349C12.9924 6.98389 12.5163 7.89157 12.2788 8.78523C11.785 10.6435 12.0099 13.6291 11.9689 15.6796ZM17.2542 20.2689L17.0454 19.9669C16.991 19.8497 16.957 19.7582 16.9032 19.652C16.7824 19.4137 16.6788 19.2294 16.5431 19.03C16.1988 18.5236 15.9338 18.3362 15.3792 18.7301C15.3343 19.2453 16.0802 21.1542 16.2677 21.726C16.8702 23.5657 16.3911 22.9279 17.6629 24.2512C18.1336 24.7407 19.2862 25.5384 19.9288 25.9055C20.4507 26.2037 22.0676 27.0388 22.7082 27.0479C22.8873 26.982 23.2457 26.0961 24.146 26.051C24.7324 26.0218 25.9771 26.0181 26.4704 26.2259C26.9131 26.4123 27.4043 27.1538 27.2395 27.8328C26.7011 30.051 23.0717 28.8282 21.7383 28.4254C19.9856 27.8962 18.8571 27.0164 18.3238 26.8736C18.5389 27.6092 19.8936 29.3823 20.4085 29.9223C21.0871 30.6341 22.2438 31.5396 23.5644 31.9019C24.7688 32.2327 27.0384 32.2246 28.176 31.8211C31.2599 30.7275 32.8688 27.8302 34.1556 25.0048C34.4177 24.4295 34.6897 23.7754 35.0339 23.2888C35.4079 22.7597 35.7393 22.5189 36.0673 21.7836C37.1027 19.4614 36.0228 17.9203 35.2109 18.7379C34.7564 19.1957 34.4842 20.108 34.2433 20.3601C34.3251 19.31 35.1387 16.1868 34.9431 15.3316C32.181 15.1164 30.0759 15.0528 27.5328 14.204C25.2522 13.4427 23.2272 12.2339 21.5245 10.5894C21.3709 10.441 21.1126 10.1568 20.8761 10.1687C20.5404 10.1854 19.5894 10.5857 19.3202 10.7437C18.4494 11.2558 17.7484 12.0707 17.2017 12.8922C16.1567 14.463 16.5814 16.3089 16.9196 18.3499C17.0194 18.9517 17.2123 19.7016 17.2542 20.2689Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.059 33.7495L15.0035 34.5652C12.0712 35.3531 5.90583 36.773 4.38767 39.1623C2.7189 41.7888 2.81047 45.9385 2.75082 49.0089H0.975586C16.9092 49.0089 32.8426 49.0089 48.7762 49.0089C48.7161 45.8315 48.8222 41.9321 47.1616 39.1979C46.7066 38.4488 45.9239 37.9249 45.0619 37.4365C42.6407 36.065 37.9764 34.9687 34.9786 34.1481C34.4968 34.0161 33.885 33.796 33.4255 33.7153C33.6626 35.4633 33.5872 36.8736 32.9257 38.357C32.2199 39.9401 30.9837 42.1542 29.9784 43.538C29.3748 44.3689 28.1961 45.6893 27.3632 46.3417C27.1317 46.5228 26.0681 47.4146 25.793 47.4651C25.393 47.5385 23.3132 45.6138 22.8525 45.1186C21.2037 43.3464 19.6738 40.7866 18.6504 38.4808C17.821 36.6118 17.9965 35.9044 18.059 33.7495Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7031 36.7306C22.864 37.3499 24.1354 38.4939 24.3386 38.8058C24.0789 39.5996 23.4502 41.0514 23.0922 41.9552C22.9908 42.2111 22.6757 42.7922 22.7725 43.0082C22.9663 43.4407 23.8375 44.3472 24.1197 44.6023C24.5027 44.9483 25.3917 45.7438 25.7646 45.939C26.0657 45.7772 26.5281 45.3442 26.8201 45.1068C27.4418 44.6011 28.1979 43.7364 28.6856 43.1076C28.8928 42.8405 28.7816 42.7837 28.6428 42.4446L27.2603 38.974C27.169 38.6888 27.3602 38.5374 27.5217 38.3716C27.7331 38.1545 27.8093 38.065 27.9893 37.8603C28.2303 37.5861 28.6857 37.0791 28.8195 36.7306C28.605 36.3952 28.3538 36.1699 28.0661 35.8706C27.8435 35.6389 27.4731 35.2231 27.0906 35.2231H24.3811C23.9875 35.2231 23.7334 35.6721 23.493 35.9C23.2622 36.1188 22.8856 36.4525 22.7031 36.7306Z" />
    </svg>

</div>

const CbrIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="88" height="50" viewBox="0 0 88 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.79 18.4286C19.0027 18.4286 22.6042 19.6429 24.5945 22.0714C24.5945 25.2619 23.7178 26.8571 21.9645 26.8571C21.1589 26.8571 20.5428 26.6905 20.1163 26.3571C19.6898 25.9762 19.1449 25.3095 18.4814 24.3571C17.0124 22.1667 15.259 21.0714 13.2213 21.0714C11.2784 21.0714 9.50135 22 7.89014 23.8571C6.32633 25.7143 5.54443 28.4762 5.54443 32.1429C5.54443 35.9524 6.4685 39.119 8.31664 41.6429C10.2122 44.1667 12.8185 45.4286 16.1357 45.4286C17.1309 45.4286 18.0786 45.3333 18.979 45.1429C19.8794 44.9524 20.6376 44.7381 21.2536 44.5C21.9171 44.2143 22.462 43.9524 22.8885 43.7143C23.3624 43.4286 23.7652 43.1667 24.0969 42.9286L24.5945 42.5714C24.8788 42.5714 25.021 42.881 25.021 43.5C25.021 43.881 24.8788 44.3095 24.5945 44.7857C23.6467 46.119 22.2488 47.3333 20.4006 48.4286C18.5525 49.4762 16.5385 50 14.3586 50C10.4254 50 7.03716 48.5238 4.19386 45.5714C1.39795 42.5714 0 38.9286 0 34.6429C0 30.2619 1.18471 26.4762 3.55412 23.2857C5.92353 20.0476 9.33549 18.4286 13.79 18.4286Z" fill="white" />
        <path d="M44.3554 18.2857C48.9047 18.2857 52.4588 19.8571 55.0178 23C57.6241 26.0952 58.9273 29.4048 58.9273 32.9286C58.9273 37.4524 57.245 41.4286 53.8805 44.8571C50.5633 48.2857 46.8907 50 42.8627 50C41.1093 50 39.427 49.8571 37.8158 49.5714C36.252 49.2381 35.3516 49.0714 35.1147 49.0714C34.6882 49.0714 34.1432 49.2143 33.4798 49.5C32.8638 49.7381 32.5083 49.8571 32.4136 49.8571C32.224 49.8571 31.916 49.7857 31.4895 49.6429C31.1104 49.5 30.9208 49.3333 30.9208 49.1429C30.9208 49.0952 30.9919 48.7143 31.1341 48C31.2763 47.2381 31.4184 46.1429 31.5606 44.7143C31.7027 43.2857 31.7738 41.6905 31.7738 39.9286V10.3571C31.7738 8.7381 31.6317 7.21429 31.3473 5.78571C31.1104 5.02381 29.902 4.64286 27.7221 4.64286H27.0824C26.7981 4.64286 26.6559 4.38095 26.6559 3.85714C26.6559 3.09524 26.7981 2.71429 27.0824 2.71429C28.504 2.57143 29.8072 2.38095 30.9919 2.14286C32.224 1.90476 33.1718 1.66667 33.8352 1.42857C34.546 1.19048 35.1384 0.976191 35.6123 0.785714C36.0862 0.547619 36.4416 0.357143 36.6785 0.214286L36.9628 0H37.105C37.2946 0 37.4841 0.142857 37.6737 0.428571C37.8632 0.666667 37.9817 0.904762 38.0291 1.14286C37.5078 2.66667 37.2472 4.7381 37.2472 7.35714V19.8571C37.2472 20.381 37.3183 20.6429 37.4604 20.6429C37.5078 20.6429 37.5789 20.619 37.6737 20.5714C38.3371 20.0952 39.3559 19.5952 40.7302 19.0714C42.1045 18.5476 43.3129 18.2857 44.3554 18.2857ZM42.0808 21.7857C40.7539 21.7857 39.6166 22.1667 38.6688 22.9286C37.7211 23.6429 37.2472 24.6905 37.2472 26.0714V42.7143C37.2472 44.1905 37.9343 45.2857 39.3086 46C40.7302 46.6667 42.3651 47 44.2132 47C46.9144 47 49.0232 45.7143 50.5396 43.1429C52.056 40.5714 52.8142 37.6667 52.8142 34.4286C52.8142 30.6667 51.8191 27.619 49.8288 25.2857C47.8858 22.9524 45.3032 21.7857 42.0808 21.7857Z" fill="white" />
        <path d="M82.4556 18.3571C85.2515 18.3571 87.0996 19.0476 88 20.4286C88 22.0952 87.7394 23.3095 87.2181 24.0714C86.6968 24.8333 86.0571 25.2143 85.2989 25.2143C84.4459 25.2143 83.664 24.8095 82.9531 24C82.2423 23.1905 81.2709 22.7857 80.0388 22.7857C78.5697 22.7857 77.2903 23.4762 76.2003 24.8571C75.1104 26.2381 74.5654 27.6905 74.5654 29.2143V39.9286C74.5654 42.6905 74.755 44.8095 75.1341 46.2857C75.2289 46.619 75.8449 46.9524 76.9822 47.2857C78.1669 47.5714 78.9962 47.7143 79.4701 47.7143C79.6123 47.7143 79.7071 48 79.7544 48.5714C79.8018 49.1429 79.7781 49.5476 79.6834 49.7857C74.9445 49.5476 72.3856 49.4286 72.0065 49.4286C71.7221 49.4286 69.1395 49.5476 64.2585 49.7857C64.0689 49.5952 63.9741 49.2143 63.9741 48.6429C63.9741 48.0238 64.0689 47.7143 64.2585 47.7143C64.8271 47.7143 65.6564 47.5714 66.7464 47.2857C67.8837 46.9524 68.4997 46.619 68.5945 46.2857C68.9262 44.9048 69.0921 43.2381 69.0921 41.2857V27.7857C69.0921 25.9286 68.7604 24.6429 68.0969 23.9286C67.623 23.3571 67.0307 22.9762 66.3199 22.7857C65.6564 22.5476 65.0878 22.4286 64.6139 22.4286C64.1874 22.4286 63.9741 22.381 63.9741 22.2857C63.9741 21.1429 64.1163 20.5476 64.4006 20.5C69.4238 19.7381 72.6936 19.119 74.21 18.6429C74.2574 18.6429 74.3285 18.6429 74.4233 18.6429C74.518 18.5952 74.5654 18.5714 74.5654 18.5714C74.755 18.5714 74.8735 18.7857 74.9208 19.2143C74.9682 19.5952 74.9682 19.881 74.9208 20.0714L74.4943 23.6429C75.3473 22.3571 76.5083 21.1667 77.9774 20.0714C79.4938 18.9286 80.9865 18.3571 82.4556 18.3571Z" fill="white" />
    </svg>
</div>

const CloudLockIcon = ({ id, className = "" }) => <div>
    <svg id={id} className={className} width="99" height="67" viewBox="0 0 99 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="99" height="67">
            <mask id="path-1-inside-1" mask-type="luminance" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.2239 28.127C87.4915 26.6879 87.6316 25.2028 87.6316 23.6842C87.6316 10.6038 77.2399 0 64.4211 0C57.1567 0 50.6718 3.40534 46.4158 8.73697C43.7314 6.81263 40.4675 5.68421 36.9474 5.68421C28.0853 5.68421 20.8473 12.8361 20.3912 21.8346C9.00881 22.5711 0 32.2369 0 44.0526C0 56.1865 9.50052 66.0532 21.3158 66.3106V66.3158H21.7895H80.5263H81L81.0009 66.31C91.4801 66.0515 99 57.2459 99 46.4211C99 38.2141 94.1489 31.1678 87.2239 28.127Z" />
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M87.2239 28.127C87.4915 26.6879 87.6316 25.2028 87.6316 23.6842C87.6316 10.6038 77.2399 0 64.4211 0C57.1567 0 50.6718 3.40534 46.4158 8.73697C43.7314 6.81263 40.4675 5.68421 36.9474 5.68421C28.0853 5.68421 20.8473 12.8361 20.3912 21.8346C9.00881 22.5711 0 32.2369 0 44.0526C0 56.1865 9.50052 66.0532 21.3158 66.3106V66.3158H21.7895H80.5263H81L81.0009 66.31C91.4801 66.0515 99 57.2459 99 46.4211C99 38.2141 94.1489 31.1678 87.2239 28.127Z" fill="#84D6FE" />
            <path d="M87.2239 28.127L86.2407 27.9441L86.0957 28.7238L86.8218 29.0426L87.2239 28.127ZM46.4158 8.73697L45.8332 9.54971L46.6049 10.103L47.1973 9.36083L46.4158 8.73697ZM20.3912 21.8346L20.4558 22.8325L21.3449 22.775L21.3899 21.8852L20.3912 21.8346ZM21.3158 66.3106H22.3158V65.3322L21.3376 65.3109L21.3158 66.3106ZM21.3158 66.3158H20.3158V67.3158H21.3158V66.3158ZM81 66.3158V67.3158H81.8543L81.9877 66.472L81 66.3158ZM81.0009 66.31L80.9763 65.3103L80.1434 65.3308L80.0132 66.1537L81.0009 66.31ZM88.207 28.3098C88.4858 26.8107 88.6316 25.2644 88.6316 23.6842H86.6316C86.6316 25.1411 86.4972 26.5651 86.2407 27.9441L88.207 28.3098ZM88.6316 23.6842C88.6316 10.0706 77.8111 -1 64.4211 -1V1C76.6686 1 86.6316 11.1369 86.6316 23.6842H88.6316ZM64.4211 -1C56.8354 -1 50.069 2.5575 45.6342 8.1131L47.1973 9.36083C51.2745 4.25319 57.478 1 64.4211 1V-1ZM46.9984 7.92422C44.1514 5.88332 40.6853 4.68421 36.9474 4.68421V6.68421C40.2497 6.68421 43.3114 7.74193 45.8332 9.54971L46.9984 7.92422ZM36.9474 4.68421C27.5256 4.68421 19.8741 12.2811 19.3925 21.784L21.3899 21.8852C21.8204 13.3911 28.6451 6.68421 36.9474 6.68421V4.68421ZM20.3267 20.8367C8.40323 21.6082 -1 31.7248 -1 44.0526H1C1 32.7491 9.61438 23.534 20.4558 22.8325L20.3267 20.8367ZM-1 44.0526C-1 56.7118 8.91672 67.0407 21.294 67.3104L21.3376 65.3109C10.0843 65.0657 1 55.6612 1 44.0526H-1ZM20.3158 66.3106V66.3158H22.3158V66.3106H20.3158ZM21.3158 67.3158H21.7895V65.3158H21.3158V67.3158ZM21.7895 67.3158H80.5263V65.3158H21.7895V67.3158ZM80.5263 67.3158H81V65.3158H80.5263V67.3158ZM81.9877 66.472L81.9886 66.4662L80.0132 66.1537L80.0123 66.1596L81.9877 66.472ZM98 46.4211C98 56.7912 90.829 65.0672 80.9763 65.3103L81.0256 67.3096C92.1312 67.0357 100 57.7005 100 46.4211H98ZM86.8218 29.0426C93.3867 31.9252 98 38.6143 98 46.4211H100C100 37.8138 94.9111 30.4103 87.6259 27.2114L86.8218 29.0426Z" fill="#FF0000" mask="url(#path-1-inside-1)" />
        </mask>
        <g mask="url(#mask0)">
            <circle cx="48.7893" cy="36.0002" r="55.8947" fill="#84D6FE" />
            <circle cx="20.3687" cy="54" r="58.7368" fill="#59A0DE" fill-opacity="0.8" />
            <g style={{"mixBlendMode": "multiply"}}>
                <circle cx="94.2632" cy="73.8946" r="58.7368" fill="#59A0DE" fill-opacity="0.52" />
            </g>
            <g style={{"mixBlendMode": "multiply"}}>
                <circle cx="101.369" cy="85.7367" r="48.7895" fill="#4185CE" fill-opacity="0.17" />
            </g>
            <circle cx="0.000411987" cy="74.3686" r="48.7895" fill="#296BB9" />
        </g>
    </svg>
</div>


export { DashboardIcon, ProfileIcon, PlanIcon, SupportIcon, CloudLockIcon, CbrIcon }