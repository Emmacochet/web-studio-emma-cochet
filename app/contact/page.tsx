"use client";

import { useRef, useState, type FormEvent } from "react";
import SiteShell from "@/components/site-shell";
import { siteContact } from "@/src/config/contact";

const fieldClassName =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] text-foreground transition placeholder:text-placeholder focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus("submitting");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms request failed:", err);
      setStatus("error");
    }
  }

  return (
    <SiteShell title="Contacter le studio">
      <div className="grid gap-14 sm:border-border sm:pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Nous contacter</p>
            <h2 className="mt-4 font-serif text-2xl leading-snug text-foreground">
              Disponible pour des commandes résidentielles, culturelles et hôtelières de charme.
            </h2>
          </div>
          <div className="space-y-3 font-mono text-[13px] uppercase tracking-[0.1em] text-body">
            <p>{siteContact.email}</p>
            <p>{siteContact.phone}</p>
            <p>{siteContact.location}</p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-8"
        >
          <input type="hidden" name="access_key" value="2629647b-65ba-47a5-aea6-37387901c479" />
          {/* Honeypot: hidden from real users, bots that fill every field trip this and Web3Forms silently drops the submission. */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="name">
              Nom
            </label>
            <input id="name" name="name" required className={fieldClassName} placeholder="Votre nom" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required className={fieldClassName} placeholder="vous@exemple.com" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="message">
              Descriptif du projet
            </label>
            <textarea id="message" name="message" rows={5} required className={`${fieldClassName} resize-none`} placeholder="Parlez-moi de votre projet." />
          </div>

          {status === "error" && (
            <p role="alert" className="font-mono text-[11px] uppercase tracking-[0.15em] text-rose-500">
              Une erreur est survenue. Merci de réessayer, ou de nous écrire directement à {siteContact.email}.
            </p>
          )}
          {status === "success" && (
            <p role="status" className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
              Message envoyé — nous revenons vers vous rapidement.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {status === "submitting" ? "Envoi en cours…" : "Envoyer la demande"}
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
        </form>
      </div>
    </SiteShell>
  );
}
