function iconSvg(icon) {
  const icons = {
    python: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#3776AB" d="M11.94 2c-2.1 0-3.94.18-3.94.18C5.7 2.45 5 3.54 5 5.44v2.8h6v.93H2.8S2 9 2 12.14c0 3.14.7 4 2.8 4h1.68v-2.36c0-1.9 1.05-3.18 3.14-3.18h5.24c1.78 0 3.14-1.47 3.14-3.27V5.44C18 3.2 16.12 2 13.95 2h-2.01Zm-3.3 1.88a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24Z"/><path fill="#FFD43B" d="M12.06 22c2.1 0 3.94-.18 3.94-.18 2.3-.27 3-1.36 3-3.26v-2.8h-6v-.93h8.2S22 15 22 11.86c0-3.14-.7-4-2.8-4h-1.68v2.36c0 1.9-1.05 3.18-3.14 3.18H9.14C7.36 13.4 6 14.87 6 16.67v1.89C6 20.8 7.88 22 10.05 22h2.01Zm3.3-1.88a1.12 1.12 0 1 1 0-2.24 1.12 1.12 0 0 1 0 2.24Z"/></svg>`,
    fastapi: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#009688" d="M12 2 4 10h5v12l8-8h-5z"/></svg>`,
    django: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#092E20" d="M4 5.5h4v13H4zm0-3.5h4v2H4zm6.5 3.5h4V17c0 3.4-1.3 5-4.65 5-1.8 0-2.85-.34-4.12-.82l1.2-3.64c.78.38 1.46.62 2.38.62.97 0 1.19-.34 1.19-1.57z"/></svg>`,
    java: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#E76F00" d="M10.2 18.8c-3.1.13-5.2-.42-5.2-1.28 0-.5.72-.94 1.91-1.23l.33.62c-.76.18-1.2.4-1.2.63 0 .48 1.86.78 4.42.66 2.56-.12 4.65-.63 4.65-1.14 0-.18-.27-.34-.78-.47l.85-.54c1.14.25 1.82.67 1.82 1.18 0 .96-2.8 1.7-6.8 1.79Zm.54-2.46c-2.06.08-3.46-.3-3.46-.86 0-.36.57-.68 1.52-.88l.26.5c-.47.1-.76.22-.76.36 0 .24.86.39 2.04.34 1.2-.05 2.18-.29 2.18-.53 0-.08-.1-.15-.3-.21l.66-.42c.6.17.95.43.95.73 0 .6-1.72 1.14-3.79 1.2h-.3Zm2.75-14.1c1.88 1.76-5.02 3.88-1.03 6.5l-.94.87C6.57 6.5 13.27 4.52 12.07 2.8c-.26-.36-.62-.6-1.04-.8 1.02.06 1.84.28 2.46.82Zm2.16 3.06c.82.94-.3 1.78-1.39 2.58-1.1.8-2.17 1.56-1.02 2.55l-.9.84c-2.25-1.82-.44-3.14 1.03-4.2.96-.69 1.77-1.28 1.17-1.88-.28-.28-.66-.46-1.1-.6.7-.03 1.64.1 2.21.72Z"/></svg>`,
    javascript: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#F7DF1E" d="M3 3h18v18H3z"/><path fill="#111" d="M9.63 17.12c.36.59.68 1.09 1.45 1.09.74 0 1.21-.29 1.21-1.43v-7.74h1.79v7.76c0 2.35-1.38 3.42-3.39 3.42-1.81 0-2.85-.94-3.39-2.07l1.33-1.03Zm5.86-.2c.48.79 1.1 1.37 2.19 1.37.92 0 1.51-.46 1.51-1.09 0-.76-.6-1.03-1.61-1.47l-.55-.24c-1.58-.67-2.63-1.5-2.63-3.28 0-1.63 1.24-2.88 3.18-2.88 1.38 0 2.37.48 3.08 1.74l-1.34.86c-.29-.52-.61-.73-1.09-.73-.5 0-.81.31-.81.73 0 .51.31.72 1.04 1.03l.55.24c1.86.8 2.91 1.62 2.91 3.46 0 1.98-1.55 3.07-3.64 3.07-2.04 0-3.36-.97-4.01-2.23l1.22-.89Z"/></svg>`,
    typescript: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#3178C6" d="M3 3h18v18H3z"/><path fill="#FFF" d="M13.2 11.65h2.1V18h1.82v-6.35h2.1V10h-6.02zm-7.32.03h1.9V18H9.6v-6.32h1.9V10H5.88z"/></svg>`,
    nodejs: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#539E43" d="m12 2 8.66 5v10L12 22l-8.66-5V7L12 2Zm0 2.31L5.34 8.15v7.69L12 19.69l6.66-3.85V8.15L12 4.3Z"/><path fill="#539E43" d="M13.16 7.7h-2.28v8.07h2.28c2.43 0 4.03-1.6 4.03-4.04 0-2.43-1.6-4.03-4.03-4.03Zm-.08 6.15h-.53V9.62h.53c1.37 0 2.28.8 2.28 2.12 0 1.31-.9 2.11-2.28 2.11Z"/></svg>`,
    nextjs: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#111"/><path fill="#fff" d="M8 8h2.1l5 6.65V8H17v8h-2l-5.1-6.73V16H8z"/></svg>`,
    api: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 7h16v3H4zm0 7h10v3H4zm12-1 4 3-4 3z"/></svg>`,
    microservices: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z"/><path fill="currentColor" d="M7 10v2h10v-2M12 12v2"/></svg>`,
    security: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2 5 5v6c0 5 3.4 9.74 7 11 3.6-1.26 7-6 7-11V5l-7-3Zm0 5a2 2 0 0 1 2 2v1h1v5h-6v-5h1V9a2 2 0 0 1 2-2Zm0 1.5A.5.5 0 0 0 11.5 9v1h1V9a.5.5 0 0 0-.5-.5Z"/></svg>`,
    architecture: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 4h8v6H3zm10 0h8v4h-8zM3 14h6v6H3zm8 2h10v4H11z"/></svg>`,
    qdrant: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="#DC244C"/><circle cx="16" cy="8" r="3" fill="#8F1FFF"/><circle cx="8" cy="16" r="3" fill="#FFB800"/><circle cx="16" cy="16" r="3" fill="#00C2FF"/></svg>`,
    dotnet: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#512BD4" d="M3 5h18v14H3z"/><path fill="#fff" d="M5.2 15.5h1.7v1.7H5.2zm2.7-8h2.05l3.08 5.2V7.5h1.7v9.2h-1.93L9.9 11.83v4.87H7.9zm6.6 0h6v1.56h-2.15v7.64h-1.7V9.06H14.5z"/></svg>`,
    csharp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#68217A" d="m12 2 8.5 4.9v10.2L12 22l-8.5-4.9V6.9L12 2Z"/><path fill="#fff" d="M10.7 15.55c-.62.42-1.35.63-2.18.63-1.13 0-2.06-.38-2.78-1.14-.72-.76-1.08-1.75-1.08-2.98 0-1.21.37-2.2 1.1-2.97.73-.77 1.66-1.15 2.8-1.15.82 0 1.54.2 2.16.6v1.78a3.04 3.04 0 0 0-2.05-.78c-.63 0-1.14.22-1.54.65-.4.43-.6 1.01-.6 1.74 0 .76.2 1.35.6 1.78.4.42.93.64 1.6.64.76 0 1.45-.27 2.01-.8v1.7Zm2.74-4.77h-.98v-1.2h1.2l.2-1.5h1.1l-.2 1.5h1.16l.2-1.5h1.1l-.2 1.5h.92v1.2h-1.08l-.23 1.75h.95v1.2h-1.1l-.2 1.53h-1.1l.2-1.53h-1.16l-.2 1.53h-1.1l.2-1.53h-.96v-1.2h1.12Zm1.37 1.75h1.16l.23-1.75h-1.16z"/></svg>`,
    nvidia: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="M3 7.5v9h3.2V10l4.6-.02c2.35 0 3.91.86 4.74 2.64-.59-.3-1.32-.44-2.18-.44H9.78v4.32h2.28v-2.1h1.04c1.55 0 2.61.5 3.17 1.49.47.83.7 1.9.7 3.21H21c0-2.55-.57-4.53-1.72-5.93 1.02-.95 1.53-2.18 1.53-3.68 0-1.2-.34-2.24-1.03-3.11-.94-1.19-2.43-1.79-4.46-1.79H3Zm9.07 1.92h2.55c1.2 0 1.8.48 1.8 1.43 0 1-.67 1.5-2 1.5h-2.35V9.42Z"/></svg>`,
    postgresql: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#336791" d="M12.5 2c-3.2 0-5.7 2.06-5.7 5.1v6.7c0 2.48 1.72 3.92 4.24 3.92.73 0 1.43-.12 2.04-.34-.2 1.16-.7 2.2-1.73 3.18l2.22.84c2.8-1.5 3.85-3.97 3.85-7.1V7.1C17.42 4.06 15.7 2 12.5 2Zm0 2.2c1.68 0 2.82 1.06 2.82 2.96v1.07c-.4-.18-.88-.3-1.44-.36-1.55-.18-2.95.16-3.95.89-.7.5-1.16 1.2-1.42 2V7.16c0-1.9 1.3-2.96 2.99-2.96Zm1.2 5.64c.6.07 1.15.24 1.62.5v2.62c-.42.38-.94.68-1.55.86-1.4.42-2.77.16-3.08-.7-.29-.82.47-2 1.86-2.68.36-.18.74-.32 1.15-.44Z"/></svg>`,
    sql: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3" fill="#7A7A7A"/><path fill="#7A7A7A" d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5c0 1.66-3.13 3-7 3S5 6.66 5 5Zm0 8v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6c0 1.66-3.13 3-7 3s-7-1.34-7-3Z"/></svg>`,
    mongodb: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#13AA52" d="M12 2c-.72 1.8-1.08 3.6-1.08 5.38 0 5.1 2.07 8.72 2.07 8.72s.08-.94.15-1.4c.2-.95.88-1.15.88-1.15-.96-.43-1.72-1.9-1.72-1.9V2h-.3Z"/><path fill="#B8C4C2" d="M12 18.4c-.08-.98-.14-2-.14-2 0-.7-.12-1.15-.12-1.15-.64.07-1.16.94-1.16.94C8.9 13.9 9 10.13 9 10.13c0-3.35 2.45-5.7 2.84-6.08l.16-.05v14.4Z"/></svg>`,
    redis: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#DC382D" d="m4.4 7.5 6.78-2.8c.52-.22 1.12-.22 1.64 0l6.78 2.8c.54.22.54.58 0 .8l-6.78 2.8c-.52.22-1.12.22-1.64 0L4.4 8.3c-.54-.22-.54-.58 0-.8Zm0 4.3 2.2-.9 4.58 1.9c.52.22 1.12.22 1.64 0l4.58-1.9 2.2.9c.54.22.54.58 0 .8l-6.78 2.8c-.52.22-1.12.22-1.64 0l-6.78-2.8c-.54-.22-.54-.58 0-.8Zm0 4.3 2.2-.9 4.58 1.9c.52.22 1.12.22 1.64 0l4.58-1.9 2.2.9c.54.22.54.58 0 .8l-6.78 2.8c-.52.22-1.12.22-1.64 0l-6.78-2.8c-.54-.22-.54-.58 0-.8Z"/></svg>`,
    query: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 3a7 7 0 1 0 4.9 12l4.55 4.55 1.4-1.4L16.3 13.6A7 7 0 0 0 10 3Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/></svg>`,
    docker: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#2496ED" d="M23.2 10.2c-.7-.5-2.3-.6-3.2-.4-.1-.8-.6-1.6-1.3-2.1l-.2-.1-.1.2c-.3.5-.4 1.2-.3 1.9.1.4.3.8.6 1.1-.3.2-.9.4-1.7.4H2.3c-.2 1.1-.1 2.2.4 3.2.7 1.4 2.2 2.1 4.2 2.1h7.1c3.1 0 5.5-1.4 6.7-4 .5 0 1.8 0 2.5-1.3.1-.1.3-.6.3-.7l-.3-.2Z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.33 9.33 0 0 1 12 6.83c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.83-4.57 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"/></svg>`,
    jenkins: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#D33833"/><circle cx="12" cy="9" r="4" fill="#F5D0B5"/><path fill="#333" d="M8.5 18.5c.4-2 1.65-3.2 3.5-3.2s3.1 1.2 3.5 3.2H8.5Zm1-9.3c.9-2.6 4.1-2.6 5 0-.8-.45-3.7-.45-5 0Z"/><path fill="#fff" d="M10.2 10.1h1.2v1.1h-1.2zm2.4 0h1.2v1.1h-1.2z"/></svg>`,
    azuredevops: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#0078D4" d="M21 5.4v12.2L15.5 20l-8.1-2.65v2.27L3 16.35 7.4 13v2.22L15 16.4V7.6L7.4 8.78V11L3 7.65 7.4 4.38v2.27L15.5 4 21 5.4Z"/></svg>`,
    gitlab: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#E24329" d="m12 21 3.8-11.7H8.2L12 21Z"/><path fill="#FC6D26" d="M8.2 9.3 12 21 2.6 9.3h5.6Zm7.6 0L12 21l9.4-11.7h-5.6Z"/><path fill="#FCA326" d="M2.6 9.3 5 2.9c.13-.4.7-.4.84 0L8.2 9.3H2.6Zm13.2 0 2.36-6.4c.14-.4.7-.4.84 0l2.4 6.4h-5.6Z"/></svg>`,
    aws: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#FF9900" d="M6.2 15.7c3.2 2.36 7.85 3.63 11.97 3.63 2.3 0 4.84-.34 6.83-1.3.3-.14.56.2.24.43-2.15 1.58-5.27 2.52-8.3 2.52-4.84 0-9.2-1.78-12.5-4.74-.27-.24-.03-.58.25-.54.58.07 1.13.26 1.5.5Z"/><path fill="#232F3E" d="M17.7 17.1c-.42-.54-2.8-.26-3.86-.13-.32.04-.37-.24-.08-.44 1.9-1.34 5.02-.95 5.38-.52.36.44-.1 3.44-1.87 4.87-.27.22-.53.1-.41-.2.4-.99 1.28-3.2.84-3.78Z"/></svg>`,
    azure: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#0078D4" d="M13.2 2 6.1 8.76l5.68-.68L17.5 2h-4.3ZM12.26 9 4 20.94h6.44L20 9h-7.74Zm.92 3.88L10.1 20.94H20l-6.82-8.06Z"/></svg>`,
    cicd: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 7h11v3H4zm0 7h16v3H4zm12-8 4 2.5L16 11z"/></svg>`,
    openai: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M11.3 2.1a3.7 3.7 0 0 1 5.3 1.35 3.75 3.75 0 0 1 4.04 6.08 3.75 3.75 0 0 1-1.12 6.87A3.75 3.75 0 0 1 14.1 21a3.72 3.72 0 0 1-5.56-.71 3.75 3.75 0 0 1-5.21-4.5 3.75 3.75 0 0 1 .84-7.24A3.75 3.75 0 0 1 9.9 3.1l1.4.8Z"/></svg>`,
    langchain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00A67E" d="M6 4h6v6H6zM12 10h6v6h-6zM6 16h6v4H6z"/></svg>`,
    rag: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h9v6H5zM5 14h14v6H5z"/><path fill="currentColor" d="M16 7h3l-3 3z"/></svg>`,
    prompt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16v11H7l-3 3V4Zm3 4v2h10V8H7Z"/></svg>`,
    nlp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16v3H4zm0 5h10v3H4zm0 5h16v3H4z"/></svg>`,
    guardrails: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16v5c0 5.35-3.1 9.68-8 11-4.9-1.32-8-5.65-8-11V4Zm2 2v3c0 4.35 2.27 7.63 6 8.9 3.73-1.27 6-4.55 6-8.9V6H6Zm5 3h2v5h-2V9Zm0 6h2v2h-2v-2Z"/></svg>`,
    pytorch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EE4C2C" d="M14.5 3.5a4 4 0 1 1 2.8 1.17V8a7 7 0 1 0 2 4.95h-2.3a4.7 4.7 0 1 1-1.38-3.3l-3.02 3.03 1.63 1.62L19.8 8.7A6.3 6.3 0 0 0 14.5 3.5Z"/></svg>`,
    huggingface: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="10" r="2" fill="#FFCC4D"/><circle cx="16" cy="10" r="2" fill="#FFCC4D"/><path fill="#FFCC4D" d="M5 13c0 4 3 7 7 7s7-3 7-7v-2a7 7 0 1 0-14 0v2Z"/><path fill="#664500" d="M9 14c.8.7 1.8 1 3 1s2.2-.3 3-1" stroke="#664500" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`,
    react: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" stroke-width="1.4"><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></g></svg>`,
    tailwind: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#38BDF8" d="M12 7c-2.67 0-4.33 1.33-5 4 1-.67 1.92-.92 2.75-.74.48.1.92.38 1.35.84.7.74 1.5 1.6 3.9 1.6 2.67 0 4.33-1.33 5-4-1 .67-1.92.92-2.75.74-.48-.1-.92-.38-1.35-.84-.7-.74-1.5-1.6-3.9-1.6Zm-5 5.3c-2.67 0-4.33 1.33-5 4 1-.67 1.92-.92 2.75-.74.48.1.92.38 1.35.84.7.74 1.5 1.6 3.9 1.6 2.67 0 4.33-1.33 5-4-1 .67-1.92.92-2.75.74-.48-.1-.92-.38-1.35-.84-.7-.74-1.5-1.6-3.9-1.6Z"/></svg>`,
    html: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#E34F26" d="M4 3h16l-1.45 16.3L12 21l-6.55-1.7L4 3Z"/><path fill="#fff" d="m8.3 6 .2 2.2h7l-.18 2H8.68l.22 2.2h6.23l-.36 4.14L12 17.3l-2.77-.76-.17-1.94h-2.5l.33 3.8L12 19.8l5.1-1.4L17.8 6H8.3Z"/></svg>`,
    css: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1572B6" d="M4 3h16l-1.45 16.3L12 21l-6.55-1.7L4 3Z"/><path fill="#fff" d="m8.6 6-.18 2h6.14l-.2 2.2H8.2l-.18 2h6.17l-.34 3.47L12 16.2l-1.85-.52-.12-1.4H7.9l.25 3L12 18.2l3.86-1.04L16.5 6H8.6Z"/></svg>`
  };

  return icons[icon] || `<span>${icon?.slice(0, 2) || ""}</span>`;
}

function renderSkillItems(items = []) {
  return items
    .map((item) => {
      const label = typeof item === "string" ? item : item.label;
      const icon = typeof item === "string" ? "" : iconSvg(item.icon);
      return `
        <span class="skill-chip">
          <span class="skill-chip-icon">${icon}</span>
          <span class="skill-chip-label">${label}</span>
        </span>
      `;
    })
    .join("");
}

export function renderSkills(fragment, data) {
  const skills = data.skillsOverview;
  if (!skills) {
    return;
  }

  const title = fragment.querySelector('[data-field="skillsTitle"]');
  if (title) title.textContent = skills.title;

  const summary = fragment.querySelector('[data-field="skillsSummary"]');
  if (summary) summary.textContent = skills.summary;

  const groupsRoot = fragment.querySelector('[data-field="skillsGroups"]');
  if (!groupsRoot) {
    return;
  }

  groupsRoot.replaceChildren();

  skills.groups.forEach((group) => {
    const article = document.createElement("article");
    article.className = "skill-group-card";
    article.innerHTML = `
      <div class="skill-group-head">
        <h3>${group.title}</h3>
      </div>
      <p class="skill-group-summary">${group.summary}</p>
      <div class="skill-chip-row">${renderSkillItems(group.items)}</div>
    `;
    groupsRoot.append(article);
  });
}
